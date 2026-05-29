import { getStatStyle } from './statUtils';

function StatBars({ stats }) {

  const totalStats = stats.reduce(
    (sum, stat) => sum + stat.base_stat,
    0
  );

  return (
    <div>
      {stats.map((stat) => {
        const { width, color } = getStatStyle(stat.base_stat);

        return (
          <div key={stat.stat.name}>
            <p>
              {stat.stat.name}: {stat.base_stat}
            </p>

            <div
              style={{
                width,
                backgroundColor: color,
                height: '3px'
              }}
            />
          </div>
        );
      })}

      {/* Total stats (no bar) */}
      <p className = "total-stats">
        total: {totalStats}
      </p>

    </div>
  );
}

export default StatBars;