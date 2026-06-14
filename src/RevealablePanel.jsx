export default function RevealablePanel({
  panelId,
  cost,
  label,
  revealed,
  canAfford,
  onReveal,
  children,
  className = '',
}) {
  return (
    <div
      className={`revealable-panel ${revealed ? 'revealable-panel--revealed' : 'revealable-panel--covered'} ${className}`.trim()}
    >
      <div className="revealable-panel__content" aria-hidden={!revealed}>
        {children}
      </div>
      {!revealed && (
        <div className="revealable-panel__cover">
          <span className="revealable-panel__label">{label}</span>
          <button
            type="button"
            className="btn btn-reveal"
            onClick={() => onReveal(panelId, cost)}
            disabled={!canAfford}
          >
            Reveal · {cost} pts
          </button>
          {!canAfford && (
            <span className="revealable-panel__cant-afford">Not enough points</span>
          )}
        </div>
      )}
    </div>
  );
}
