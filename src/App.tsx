import "./index.css";
import Quill from "./Quill";
import Tiptap from "./Tiptap";

export function App() {
	return (
		<div className="w-full h-screen p-8 flex flex-col text-center relative z-10">
			<Quill />
			<hr className="my-4 border-gray-500 shrink-0" />
			<Tiptap />
		</div>
	);
}

export default App;
