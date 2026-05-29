import { getStatStyle } from './statUtils';

function StatBars({ stats }) {
  return (
    <div >
      {stats.map((stat) => {
        const { width, color } = getStatStyle(stat.base_stat);
        return (
          <div key={stat.stat.name} >
            <p>{stat.stat.name}: {stat.base_stat}</p>
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
    </div>
  );
}

export default StatBars;