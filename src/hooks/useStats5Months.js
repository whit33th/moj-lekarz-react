import { useQueries } from '@tanstack/react-query';
import { generalService } from '../api/services/generalService';
import { getLast5MonthsRanges } from '../utils/dateUtils';

export function useStats5Months() {
  const monthRanges = getLast5MonthsRanges();

  const results = useQueries({
    queries: monthRanges.map(({ startDate, endDate, name }) => ({
      queryKey: ['adminStatsDetails', startDate, endDate],
      queryFn: () => generalService.getAdminStatsDetails(startDate, endDate),
      select: (data) => ({
        name,
        patients: data.data.countUser.totalPatient,
        clinics: data.data.countUser.totalClinic,
      }),
    })),
  });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  
  if (isLoading || isError) return { isLoading, isError, data: null };

  const data = results.map((result) => result.data);
  
  const maxValue = Math.max(
    ...data.map((item) => Math.max(item.patients, item.clinics))
  );
  
  const tickCount = 6;
  const roundedMax = Math.ceil(maxValue / 10) * 10;
  const tickInterval = Math.ceil(roundedMax / (tickCount - 1));
  const ticks = Array.from({ length: tickCount }, (_, i) => i * tickInterval);

  return {
    isLoading,
    isError,
    data,
    chartConfig: {
      domain: [0, roundedMax],
      ticks,
    },
  };
}
