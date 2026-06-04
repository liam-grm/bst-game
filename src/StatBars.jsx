import { formatText, getStatStyle } from './statUtils';

function StatBars({ stats }) {
  const totalStats = stats.reduce((sum, stat) => sum + stat.base_stat, 0);

  return (
    <div className="stat-bars">
      {stats.map((stat) => {
        const { fillPercent, color } = getStatStyle(stat.base_stat);

        return (
          <div key={stat.stat.name} className="stat-row">
            <div className="stat-label-row">
              <span className="stat-name">{formatText(stat.stat.name)}</span>
              <span className="stat-value">{stat.base_stat}</span>
            </div>
            <div className="stat-bar-track">
              <div
                className="stat-bar"
                style={{
                  width: fillPercent,
                  backgroundColor: color,
                }}
              />
            </div>
          </div>
        );
      })}

      <p className="total-stats">
        <span className="stat-name">Total</span>
        <span className="stat-value">{totalStats}</span>
      </p>
    </div>
  );
}

export default StatBars;
