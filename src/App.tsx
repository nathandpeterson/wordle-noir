import GameGrid from "./components/GameGrid";
import Keyboard from "./components/Keyboard";
import StatusLine from "./components/StatusLine";
import AppShell from "./layouts/AppShell";

function formatCaseFileDate(date = new Date()) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}${day}${year}`;
}

function App() {
  return (
    <AppShell caseFileDate={formatCaseFileDate()}>
      <GameGrid />
      <StatusLine />
      <Keyboard />
    </AppShell>
  );
}

export default App;
