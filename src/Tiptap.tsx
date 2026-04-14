import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

const initialContent = `
Tiptap Editor demo
<p></p>
<blockquote>
<p>あのイーハトーヴォのすきとおった風、</p>
<p>夏でも底に冷たさをもつ青いそら、</p>
<p>うつくしい森で飾られたモリーオ市、</p>
<p>郊外のぎらぎらひかる草の波。</p>
</blockquote>
<p></p>
<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.aozora.gr.jp/cards/000081/files/1935_19925.html">ポラーノの広場 - 宮沢賢治</a></p>
`;

const Tiptap = () => {
	const [html, setHtml] = useState("");
	const [json, setJson] = useState("{}");

	const editor = useEditor({
		// https://tiptap.dev/docs/editor/extensions
		extensions: [StarterKit],
		content: initialContent,
		onCreate: ({ editor }) => {
			setHtml(editor.getHTML());
			setJson(JSON.stringify(editor.getJSON(), null, 2));
		},
		onUpdate: ({ editor }) => {
			setHtml(editor.getHTML());
			setJson(JSON.stringify(editor.getJSON(), null, 2));
		},
	});

	return (
		<div className="flex gap-4 w-full items-stretch flex-1 min-h-0">
			<span className="text-sm font-bold text-left w-12 shrink-0">Tiptap</span>
			<div className="flex-1 flex flex-col gap-1">
				<div className="flex items-center h-6">
					<span className="text-sm font-bold text-left">HTML</span>
				</div>
				<pre className="flex-1 border border-gray-500 rounded-lg p-4 overflow-auto bg-white/10 text-left text-sm whitespace-pre-wrap break-all">
					<code>{html}</code>
				</pre>
			</div>
			<div className="flex-1 flex flex-col gap-1">
				<div className="flex items-center h-6">
					<span className="text-sm font-bold text-left">JSON</span>
				</div>
				<pre className="flex-1 border border-gray-500 rounded-lg p-4 overflow-auto bg-white/10 text-left text-sm whitespace-pre-wrap break-all">
					<code>{json}</code>
				</pre>
			</div>
			<div className="flex-1 flex flex-col gap-1">
				<div className="flex items-center justify-between gap-2 h-6">
					<span className="text-sm font-bold text-left">Editor</span>
					<div>
						<button
							type="button"
							className="text-xs px-2 py-0.5 rounded hover:bg-white/20 active:scale-90 active:bg-white/30 transition-transform cursor-pointer"
							onClick={() => editor.commands.setContent(initialContent)}
						>
							Reset
						</button>
						<button
							type="button"
							className="text-xs px-2 py-0.5 rounded hover:bg-white/20 active:scale-90 active:bg-white/30 transition-transform cursor-pointer"
							onClick={() => editor.commands.clearContent()}
						>
							Clear
						</button>
					</div>
				</div>
				<EditorContent className="flex-1 min-h-0" editor={editor} />
			</div>
		</div>
	);
};

export default Tiptap;
