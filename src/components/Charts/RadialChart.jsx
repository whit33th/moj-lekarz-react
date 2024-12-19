import star from "@assets/img/star.png"
import styles from "./RadialChart.module.css"

const defaultData = [
  { name: "Ocena 5", color: "#3D35AE" },
  { name: "Ocena 4", color: "#808EFC" },
  { name: "Ocena 3", color: "#A3DBF3" },
  { name: "Ocena 2", color: "#D2EFFC" },
  { name: "Ocena 1", color: "#D0D0D0" },
]

const ColorfulRatingChart = ({ data = [] }) => {
  const mergedData = defaultData.map((item, index) => ({
    ...item,
    value: data[index] || 0,
  }))

  const total = mergedData.reduce((sum, item) => sum + item.value, 0)

  const gradientStops = mergedData
    .map((item, index) => {
      const percentage = (item.value / total) * 100
      const start = mergedData
        .slice(0, index)
        .reduce((acc, curr) => acc + (curr.value / total) * 100, 0)
      return `${item.color} ${start}% ${start + percentage}%`
    })
    .join(", ")

  return (
    <>
      <div className={styles.ratingChartContent}>
        <div
          className={styles.donutChart}
          style={{ background: `conic-gradient(${gradientStops})` }}
        >
          <div className={styles.donutHole}></div>
          {mergedData.map((item, index) => {
            const angle =
              ((item.value / 2 +
                mergedData
                  .slice(0, index)
                  .reduce((sum, prev) => sum + prev.value, 0)) /
                total) *
              360
            const radius = 100
            const x = Math.cos(((angle - 90) * Math.PI) / 180) * radius + 100
            const y = Math.sin(((angle - 90) * Math.PI) / 180) * radius + 100
            return (
              <div
                key={`label-${item.name}`}
                className={styles.donutLabel}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                }}
              >
                {Math.round((item.value / total) * 100)}%
              </div>
            )
          })}
        </div>
        <div className={styles.ratingLegend}>
          {mergedData.map((item) => (
            <div key={item.name} className={styles.legendItem}>
              <div className={styles.duplex}>
                <div
                  className={styles.legendColor}
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className={styles.legendName}>{item.name}</span>
              </div>

              <img className={styles.star} src={star} alt="star" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ColorfulRatingChart
