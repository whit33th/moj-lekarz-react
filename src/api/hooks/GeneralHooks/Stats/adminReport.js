import { useQuery } from "@tanstack/react-query";
import { generalService } from "../../../services/generalService";

export default function useAdminReport({ startDate, endDate }) {
  const { refetch } = useQuery({
    queryKey: ["adminReport", startDate, endDate],
    queryFn: () => generalService.getReport(startDate, endDate),
    enabled: false,
  });

  const downloadReport = async () => {
    try {
      const response = await refetch();
      const blob = new Blob([response.data.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report-${startDate}-to-${endDate}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return { downloadReport };
}
