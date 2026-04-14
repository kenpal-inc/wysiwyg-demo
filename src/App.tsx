import "./index.css";
import Tiptap from "./Tiptap";

export function App() {
	return (
		<div className="w-full p-8 text-center relative z-10">
			<hr className="my-4 border-gray-500" />
			<Tiptap />
		</div>
	);
}

export default App;
