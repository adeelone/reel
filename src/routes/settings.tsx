export function SettingsRoute() {
  return (
    <div className="page settings-grid">
      <h1>Settings</h1>
      <label>Region<select defaultValue="US"><option value="US">United States</option><option value="MX">Mexico</option><option value="ES">Spain</option></select></label>
      <label>Language<select defaultValue="en-US"><option value="en-US">English</option><option value="es-MX">Spanish</option></select></label>
      <label>Rating mode<select defaultValue="10"><option value="10">10 point</option><option value="5">5 star</option></select></label>
      <button type="button" onClick={() => localStorage.clear()}>Delete local data</button>
    </div>
  );
}
