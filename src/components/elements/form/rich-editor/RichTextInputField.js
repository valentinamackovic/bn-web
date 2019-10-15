import React, { Component } from "react";
import {
	Editor,
	EditorState,
	RichUtils,
	getDefaultKeyBinding,
	convertFromRaw,
	convertToRaw,
	ContentState,
	ContentBlock,
	convertFromHTML
} from "draft-js";
import { convertToHTML } from "draft-convert";

import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import "./editor.css";
import Divider from "../../../common/Divider";
import "../../../pages/events/rich-event-description.css";

const convertHtmlPropToEditorState = html => {
	const blocksFromHTML = convertFromHTML(html);
	const state = ContentState.createFromBlockArray(
		blocksFromHTML.contentBlocks,
		blocksFromHTML.entityMap
	);

	return EditorState.createWithContent(state);
};

const styleMap = {
	CODE: {
		backgroundColor: "rgba(0, 0, 0, 0.05)",
		fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
		fontSize: 16,
		padding: 2
	}
};

const INLINE_STYLES = [
	{ label: "Bold", style: "BOLD" },
	{ label: "Italic", style: "ITALIC" },
	{ label: "Underline", style: "UNDERLINE" }
	//{ label: "Monospace", style: "CODE" }
];

const BLOCK_TYPES = [
	{ label: "Header 1", style: "header-one" },
	{ label: "Header 2", style: "header-two" },
	// { label: "H3", style: "header-three" },
	// { label: "H4", style: "header-four" },
	// { label: "H5", style: "header-five" },
	// { label: "H6", style: "header-six" },
	{ label: "Blockquote", style: "blockquote" },
	{ label: "List", style: "unordered-list-item" }
	//{ label: "OL", style: "ordered-list-item" }
	//{ label: "Code Block", style: "code-block" }
];

class StyleButton extends Component {
	constructor(props) {
		super(props);
		this.onToggle = e => {
			e.preventDefault();
			this.props.onToggle(this.props.style);
		};
	}

	render() {
		let className = "RichEditor-styleButton";
		if (this.props.active) {
			className += " RichEditor-activeButton";
		}

		return (
			<span className={className} onMouseDown={this.onToggle}>
				{this.props.label}
			</span>
		);
	}
}

const InlineStyleControls = props => {
	const currentStyle = props.editorState.getCurrentInlineStyle();

	return (
		<div className="RichEditor-controls">
			{INLINE_STYLES.map(type => (
				<StyleButton
					key={type.label}
					active={currentStyle.has(type.style)}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			))}
		</div>
	);
};

const BlockStyleControls = props => {
	const { editorState } = props;
	const selection = editorState.getSelection();
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();
	return (
		<div className="RichEditor-controls">
			{BLOCK_TYPES.map(type => (
				<StyleButton
					key={type.label}
					active={type.style === blockType}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			))}
		</div>
	);
};

function getBlockStyle(block) {
	switch (block.getType()) {
		case "blockquote":
			return "RichEditor-blockquote";
		default:
			return null;
	}
}

const styles = theme => ({
	root: {
		borderStyle: "solid",
		borderWidth: 0.5,
		borderColor: "#777777",
		minHeight: 100,
		padding: 10
	},
	styleContainer: {
		display: "flex"
		//padding: 10
	}
});

class RichTextInputField extends Component {
	constructor(props) {
		super(props);

		this.state = { editorState: EditorState.createEmpty() };

		this.onChange = this.onChange.bind(this);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const currentHtml = this.props.value;
		if (
			!this.htmlHasBeenSet &&
			currentHtml &&
			prevProps.value !== currentHtml
		) {
			const editorState = convertHtmlPropToEditorState(currentHtml);
			this.htmlHasBeenSet = true;
			this.setState({ editorState });
		}
	}

	onChange(editorState) {
		this.setState({ editorState }, () => {
			const currentContent = this.state.editorState.getCurrentContent();
			const html = convertToHTML(currentContent);

			//TODO, doens't appear to be working
			//html = html.split("<p></p>").join("<br/>");

			this.props.onChange(html);
		});
	}

	mapKeyToEditorCommand(e) {
		switch (e.keyCode) {
			case 9: {
				// TAB
				const newEditorState = RichUtils.onTab(
					e,
					this.state.editorState,
					4 /* maxDepth */
				);
				if (newEditorState !== this.state.editorState) {
					this.onChange(newEditorState);
				}
				break;
			}
			default: {
				return getDefaultKeyBinding(e);
			}
		}
	}

	handleKeyCommand(command, editorState) {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return true;
		}
		return false;
	}

	toggleBlockType(blockType) {
		this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
	}

	toggleInlineStyle(inlineStyle) {
		this.onChange(
			RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
		);
	}

	render() {
		const { editorState } = this.state;
		const { classes, placeholder } = this.props;

		return (
			<div className={classes.root} onClick={() => this.editor.focus()}>
				<div className={classes.styleContainer}>
					<BlockStyleControls
						editorState={editorState}
						onToggle={this.toggleBlockType.bind(this)}
					/>
					<InlineStyleControls
						editorState={editorState}
						onToggle={this.toggleInlineStyle.bind(this)}
					/>
				</div>

				<Divider style={{ marginBottom: 10 }}/>

				<div className={"rich-edit-content"}>
					<Editor
						editorState={this.state.editorState}
						onChange={this.onChange}
						blockStyleFn={getBlockStyle}
						customStyleMap={styleMap}
						editorState={editorState}
						handleKeyCommand={this.handleKeyCommand.bind(this)}
						keyBindingFn={this.mapKeyToEditorCommand.bind(this)}
						onChange={this.onChange}
						placeholder={placeholder}
						ref={ref => (this.editor = ref)}
						spellCheck={true}
					/>
				</div>
			</div>
		);
	}
}

RichTextInputField.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(RichTextInputField);
