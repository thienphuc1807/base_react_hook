import "./App.scss";
import Header from "./components/header";
import TableUsers from "./components/TableUsers";
function App() {
    return (
        <div className="app-container">
            <Header />
            <TableUsers />
        </div>
    );
}

export default App;
