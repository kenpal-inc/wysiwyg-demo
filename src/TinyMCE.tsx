import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import type { Editor as TinyMCEEditor } from "tinymce";

import "tinymce/tinymce";
import "tinymce/models/dom/model";
import "tinymce/themes/silver";
import "tinymce/icons/default";
import "tinymce/skins/ui/oxide/skin";
import "tinymce/skins/content/default/content";

const initialValue = `
TinyMCE Editor demo
<blockquote>
あのイーハトーヴォのすきとおった風、<br>
夏でも底に冷たさをもつ青いそら、<br>
うつくしい森で飾られたモリーオ市、<br>
郊外のぎらぎらひかる草の波。
</blockquote>
<a href="https://www.aozora.gr.jp/cards/000081/files/1935_19925.html">ポラーノの広場 - 宮沢賢治</a>
`;

export default function TinyMCE() {
	const editorRef = useRef<TinyMCEEditor>(null);
	const [html, setHtml] = useState("");

	return (
		<div className="flex gap-4 w-full items-stretch flex-1 min-h-0">
			<span className="text-sm font-bold text-left w-14 shrink-0">TinyMCE</span>
			<div className="flex-1 flex flex-col gap-1">
				<div className="flex items-center h-6">
					<span className="text-sm font-bold text-left">HTML</span>
				</div>
				<pre className="flex-1 border border-gray-500 rounded-lg p-4 overflow-auto bg-white/10 text-left text-sm whitespace-pre-wrap break-all">
					<code>{html}</code>
				</pre>
			</div>
			<div className="flex-1 flex flex-col gap-1">
				<div className="flex items-center justify-between gap-2 h-6">
					<span className="text-sm font-bold text-left">Editor</span>
					<div>
						<button
							type="button"
							className="text-xs px-2 py-0.5 rounded hover:bg-white/20 active:scale-90 active:bg-white/30 transition-transform cursor-pointer"
							onClick={() => {
								if (editorRef.current) {
									editorRef.current.setContent(initialValue);
									setHtml(editorRef.current.getBody().innerHTML);
								}
							}}
						>
							Reset
						</button>
						<button
							type="button"
							className="text-xs px-2 py-0.5 rounded hover:bg-white/20 active:scale-90 active:bg-white/30 transition-transform cursor-pointer"
							onClick={() => {
								if (editorRef.current) {
									editorRef.current.setContent("");
									setHtml(editorRef.current.getBody().innerHTML);
								}
							}}
						>
							Clear
						</button>
					</div>
				</div>
				<Editor
					licenseKey="gpl"
					initialValue={initialValue}
					init={{ menubar: false, resize: false }}
					onInit={(_evt, editor) => {
						editorRef.current = editor;
						setHtml(editor.getBody().innerHTML);
					}}
					onEditorChange={(_cnt, editor) => setHtml(editor.getBody().innerHTML)}
				/>
			</div>
		</div>
	);
}
