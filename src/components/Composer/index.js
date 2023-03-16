import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { useState } from 'react';

import CodeHighlightPlugin from '../../utils/plugins/CodeHighlightPlugin';
import ToolbarPlugin from '../../utils/plugins/ToolbarPlugin';
import Theme from './themes/Theme';

const editorConfig = {
  theme: Theme,
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode
  ]
};

export default function Editor() {
  const [publicationContent, setPublicationContent] = useState();
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className={
              'text-base text-black relative tabular-nums outline-none py-15 px-10 caret-black min-h-[65px]'
            }
          />
        }
        ErrorBoundary={() => <div>{'Something went wrong!'}</div>}
      />
      <OnChangePlugin
        onChange={(editorState) => {
          editorState.read(() => {
            const markdown = $convertToMarkdownString(TRANSFORMERS);
            setPublicationContent(markdown.replaceAll('\n\n', '\n'));
          });
        }}
      />

      <AutoFocusPlugin />
      <ListPlugin />
      <LinkPlugin />
      <CodeHighlightPlugin />
    </LexicalComposer>
  );
}
