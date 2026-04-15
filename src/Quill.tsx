import Quill from "quill";
import { useEffect, useRef, useState } from "react";

import "quill/dist/quill.snow.css";

const initialText =
	`Quill Editor demo` +
	`<blockquote>` +
	`あのイーハトーヴォのすきとおった風、<br>` +
	`夏でも底に冷たさをもつ青いそら、<br>` +
	`うつくしい森で飾られたモリーオ市、<br>` +
	`郊外のぎらぎらひかる草の波。` +
	`</blockquote>` +
	`<a href="https://www.aozora.gr.jp/cards/000081/files/1935_19925.html">ポラーノの広場 - 宮沢賢治</a>`;

export default function QuillEditor() {
	const quillRef = useRef<Quill>(null);
	const editorRef = useRef<HTMLDivElement>(null);
	const [html, setHtml] = useState("");
	const [delta, setDelta] = useState("");

	useEffect(() => {
		if (editorRef.current && !quillRef.current) {
			const q = new Quill(editorRef.current, {
				theme: "snow",
				modules: {
					toolbar: [
						[{ header: [1, 2, 3, false] }],
						["bold", "italic", "underline", "link"],
						["blockquote", "code-block"],
						[{ list: "ordered" }, { list: "bullet" }],
						["clean"],
					],
				},
			});
			quillRef.current = q;
			q.clipboard.dangerouslyPasteHTML(initialText);
			setHtml(q.root.innerHTML);
			setDelta(JSON.stringify(q.getContents(), null, 2));
			q.on("text-change", () => {
				setHtml(q.root.innerHTML);
				setDelta(JSON.stringify(q.getContents(), null, 2));
			});
		}
	}, []);

	return (
		<div className="flex gap-4 w-full items-stretch flex-1 min-h-0">
			<span className="text-sm font-bold text-left w-14 shrink-0">Quill</span>
			<div className="flex-1 min-w-0 flex flex-col gap-1">
				<div className="flex items-center h-6">
					<span className="text-sm font-bold text-left">HTML</span>
				</div>
				<pre className="flex-1 border border-gray-500 rounded-lg p-4 overflow-auto bg-white/10 text-left text-sm whitespace-pre-wrap break-all">
					<code>{html}</code>
				</pre>
			</div>
			<div className="flex-1 min-w-0 flex flex-col gap-1">
				<div className="flex items-center h-6">
					<span className="text-sm font-bold text-left">Delta</span>
				</div>
				<pre className="flex-1 border border-gray-500 rounded-lg p-4 overflow-auto bg-white/10 text-left text-sm whitespace-pre-wrap break-all">
					<code>{delta}</code>
				</pre>
			</div>
			<div className="flex-1 min-w-0 flex flex-col gap-1">
				<div className="flex items-center justify-between gap-2 h-6">
					<span className="text-sm font-bold text-left">Editor</span>
					<div>
						<button
							type="button"
							className="text-xs px-2 py-0.5 rounded hover:bg-white/20 active:scale-90 active:bg-white/30 transition-transform cursor-pointer"
							onClick={() => {
								if (quillRef.current)
									quillRef.current.clipboard.dangerouslyPasteHTML(initialText);
							}}
						>
							Reset
						</button>
						<button
							type="button"
							className="text-xs px-2 py-0.5 rounded hover:bg-white/20 active:scale-90 active:bg-white/30 transition-transform cursor-pointer"
							onClick={() => {
								if (quillRef.current) quillRef.current.setText("");
							}}
						>
							Clear
						</button>
					</div>
				</div>
				<div className="flex-1 min-h-0 flex flex-col bg-white/10">
					<div ref={editorRef} />
				</div>
			</div>
		</div>
	);
}
