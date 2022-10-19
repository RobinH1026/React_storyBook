/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/ban-types */
import FroalaEditorComponent from "react-froala-wysiwyg";

/**
 * Froala Editor not provide official type definition so the following typings may not be correct.
 * Reference: https://github.com/froala/wysiwyg-editor/issues/2369
 */
export interface JQueryEventObject {}
export interface JQueryInputEventObject {}
export interface JQueryKeyEventObject {}
export interface JQueryMouseEventObject {}

export type GenericObject<T = any> = { [key: string]: T };
export interface ToolbarButtons {
  [key: string]: {
    buttons: string[];
    align?: string;
    buttonsVisible?: number;
  };
}
export interface EmoticonButton {
  code: string;
  desc: string;
}
export interface SpecialCharacterSet {
  title: string;
  list: {
    char: string;
    desc: string;
  }[];
}
export type UploadMethod = "POST" | "PUT";
export type DeleteMethod = "POST" | "DELETE";
export type GetMethod = "POST" | "GET";
export type MediaAlign = "left" | "right" | "center";
export type DisplayType = "block" | "inline";

export interface FroalaOptions {
  // Aviary Editor
  aviaryKey?: boolean;
  aviaryOptions?: { [key: string]: any };

  // Char Counter
  charCounterCount?: boolean;
  charCounterMax?: number;

  // Code Beautifier
  codeBeautifierOptions?: GenericObject;

  // Code View
  codeMirror?: object;
  codeMirrorOptions?: GenericObject;
  codeViewKeepActiveButtons?: string[];

  // Colors
  colorsBackground?: string[];
  colorsButtons?: string[];
  colorsHEXInput?: boolean;
  colorsStep?: number;
  colorsText?: string[];

  // Draggable
  dragInline?: boolean;

  // Events
  events?: Partial<FroalaEvents>;

  // Embedly
  embedlyEditButtons?: string[];
  embedlyInsertButtons?: string[];
  embedlyKey?: string;
  embedlyScriptPath?: string;

  // Emoticons
  emoticonsButtons?: string[];
  emoticonsSet?: EmoticonButton[];
  emoticonsStep?: number;
  emoticonsUseImage?: boolean;

  // Entities
  entities?: string;

  // File
  fileAllowedTypes?: string[];
  fileInsertButtons?: string[];
  fileMaxSize?: number;
  fileUpload?: boolean;
  fileUploadMethod?: UploadMethod;
  fileUploadParam?: string;
  fileUploadParams?: object;
  fileUploadToS3?: object;
  fileUploadURL?: string;
  fileUseSelectedText?: boolean;

  // Font Family
  fontFamily?: GenericObject;
  fontFamilyDefaultSelection?: string;
  fontFamilySelection?: boolean;

  // Font Size
  fontSize?: string[];
  fontSizeDefaultSelection?: string;
  fontSizeSelection?: boolean;
  fontSizeUnit?: string;

  // Form
  formEditButtons?: string[];
  formMultipleStyles?: boolean;
  formStyles?: GenericObject;
  formUpdateButtons?: string[];

  // Licensing
  key?: string;

  // General
  attribution?: boolean;
  autofocus?: boolean;
  direction?: "auto" | "ltr" | "rtl";
  disableRightClick?: boolean;
  documentReady?: boolean;
  editInPopup?: boolean;
  editorClass?: string;
  enter?: string;
  fullPage?: boolean;
  height?: number;
  heightMax?: number;
  heightMin?: number;
  htmlAllowComments?: boolean;
  htmlAllowedAttrs?: string[];
  htmlAllowedEmptyTags?: string[];
  htmlAllowedStyleProps?: string[];
  htmlAllowedTags?: string[];
  htmlDoNotWrapTags?: string[];
  htmlExecuteScripts?: boolean;
  htmlIgnoreCSSProperties?: string[];
  htmlRemoveTags?: string[];
  htmlSimpleAmpersand?: boolean;
  htmlUntouched?: boolean;
  iconsTemplate?: string;
  iframe?: boolean;
  iframeDefaultStyle?: string;
  iframeStyle?: string;
  iframeStyleFiles?: string[];
  indentMargin?: number;
  initOnClick?: boolean;
  keepFormatOnDelete?: boolean;
  multiLine?: boolean;
  pasteAllowLocalImages?: boolean;
  pasteAllowedStyleProps?: string[];
  pasteDeniedAttrs?: string[];
  pasteDeniedTags?: string[];
  pastePlain?: boolean;
  placeholderText?: string;
  pluginsEnabled?: string[];
  requestHeaders?: GenericObject<string>;
  requestWithCORS?: boolean;
  requestWithCredentials?: boolean;
  scrollableContainer?: string;
  shortcutsEnabled?: string[];
  shortcutsHint?: boolean;
  spellcheck?: boolean;
  tabIndex?: number;
  tabSpaces?: number;
  theme?: string;
  toolbarBottom?: boolean;
  toolbarButtons?: Partial<ToolbarButtons>;
  toolbarButtonsMD?: Partial<ToolbarButtons>;
  toolbarButtonsSM?: Partial<ToolbarButtons>;
  toolbarButtonsXS?: Partial<ToolbarButtons>;
  toolbarContainer?: string;
  toolbarInline?: boolean;
  toolbarSticky?: boolean;
  toolbarStickyOffset?: number;
  toolbarVisibleWithoutSelection?: boolean;
  tooltips?: boolean;
  typingTimer?: number;
  useClasses?: boolean;
  width?: string;
  zIndex?: number;

  // Help
  helpSets?: object[];

  // Image
  imageAddNewLine?: boolean;
  imageAllowedTypes?: string[];
  imageAltButtons?: string[];
  imageCORSProxy?: string;
  imageDefaultAlign?: MediaAlign;
  imageDefaultDisplay?: DisplayType;
  imageDefaultMargin?: number;
  imageDefaultWidth?: number;
  imageEditButtons?: string[];
  imageInsertButtons?: string[];
  imageMaxSize?: number;
  imageMinWidth?: number;
  imageMove?: boolean;
  imageMultipleStyles?: boolean;
  imageOutputSize?: boolean;
  imagePaste?: boolean;
  imagePasteProcess?: boolean;
  imageResize?: boolean;
  imageResizeWithPercent?: boolean;
  imageRoundPercent?: boolean;
  imageSizeButtons?: string[];
  imageSplitHTML?: boolean;
  imageStyles?: GenericObject<string>;
  imageTUIOptions?: object;
  imageTextNear?: boolean;
  imageUpload?: boolean;
  imageUploadMethod?: UploadMethod;
  imageUploadParam?: string;
  imageUploadParams?: object;
  imageUploadRemoteUrls?: boolean;
  imageUploadToS3?: object;
  imageUploadURL?: string;

  // Image Manager
  imageManagerDeleteMethod?: DeleteMethod;
  imageManagerDeleteParams?: object;
  imageManagerDeleteURL?: string;
  imageManagerLoadMethod?: GetMethod;
  imageManagerLoadParams?: object;
  imageManagerLoadURL?: string;
  imageManagerPageSize?: number;
  imageManagerPreloader?: string;
  imageManagerScrollOffset?: number;
  imageManagerToggleTags?: boolean;

  // Inline Style
  inlineStyles?: GenericObject<string>;

  // Inline Class
  inlineClasses?: GenericObject<string>;

  // Language
  language?: string;

  // Line Breaker
  lineBreakerHorizontalOffset?: number;
  lineBreakerOffset?: number;
  lineBreakerTags?: string[];

  // Link
  linkAlwaysBlank?: boolean;
  linkAlwaysNoFollow?: boolean;
  linkAttributes?: GenericObject;
  linkAutoPrefix?: string;
  linkConvertEmailAddress?: boolean;
  linkEditButtons?: string[];
  linkInsertButtons?: string[];
  linkList?: GenericObject<string>[];
  linkMultipleStyles?: boolean;
  linkNoOpener?: boolean;
  linkNoReferrer?: boolean;
  linkStyles?: GenericObject<string>;
  linkText?: boolean;

  // Paragraph Format
  lineHeights?: GenericObject<string>;
  paragraphDefaultSelection?: string;
  paragraphFormat?: GenericObject<string>;
  paragraphFormatSelection?: boolean;
  paragraphMultipleStyles?: boolean;
  paragraphStyles?: GenericObject<string>;

  // Lists
  listAdvancedTypes?: boolean;

  // Quick Insert
  quickInsertButtons?: string[];
  quickInsertEnabled?: boolean;
  quickInsertTags?: string[];

  // Font Awesome
  faButtons?: string[];
  fontAwesomeSets?: object;
  fontAwesomeTemplate?: string;

  // Special Characters
  specialCharButtons?: string[];
  specialCharactersSets?: SpecialCharacterSet[];

  // SCAYT Spell Checker
  scaytAutoload?: boolean;
  scaytCustomerId?: string;
  scaytOptions?: object;

  // Save
  saveInterval?: number;
  saveMethod?: UploadMethod;
  saveParam?: string;
  saveParams?: object;
  saveURL?: string;

  // Table
  tableCellMultipleStyles?: boolean;
  tableCellStyles?: GenericObject<string>;
  tableColors?: string[];
  tableColorsButtons?: string[];
  tableColorsStep?: number;
  tableDefaultWidth?: string;
  tableEditButtons?: string[];
  tableInsertButtons?: string[];
  tableInsertHelper?: boolean;
  tableInsertHelperOffset?: number;
  tableInsertMaxSize?: number;
  tableMultipleStyles?: boolean;
  tableResizer?: boolean;
  tableResizerOffset?: number;
  tableResizingLimit?: number;
  tableStyles?: GenericObject<string>;

  // Video
  videoAllowedProviders?: string[];
  videoAllowedTypes?: string[];
  videoDefaultAlign?: MediaAlign;
  videoDefaultDisplay?: DisplayType;
  videoDefaultWidth?: number;
  videoEditButtons?: string[];
  videoInsertButtons?: string[];
  videoMaxSize?: number;
  videoMove?: boolean;
  videoResize?: boolean;
  videoResponsive?: boolean;
  videoSizeButtons?: boolean;
  videoSplitHTML?: boolean;
  videoTextNear?: boolean;
  videoUpload?: boolean;
  videoUploadMethod?: UploadMethod;
  videoUploadParam?: string;
  videoUploadParams?: object;
  videoUploadToS3?: boolean;
  videoUploadURL?: string;

  // Word
  wordAllowedStyleProps?: string[];
  wordDeniedAttrs?: string[];
  wordDeniedTags?: string[];
  wordPasteKeepFormatting?: boolean;
  wordPasteModal?: boolean;
}

export interface FroalaEvents {
  blur?: () => void;
  click?: (clickEvent: any) => void;
  contentChanged?: () => void;
  destroy?: () => void;
  drop?: (dropEvent: JQueryEventObject) => void;
  focus?: () => void;
  initialized?: () => void;
  initializationDelayed?: () => void;
  input?: (inputEvent: JQueryInputEventObject) => void;
  keydown?: (keydownEvent: JQueryKeyEventObject) => void;
  keypress?: (keypressEvent: JQueryKeyEventObject) => void;
  keyup?: (keyupEvent: JQueryKeyEventObject) => void;
  mousedown?: (mousedownEvent: JQueryMouseEventObject) => void;
  mouseup?: (mouseupEvent: JQueryMouseEventObject) => void;
  shortcut?: (event: Event, commandName: string, shortcutValue: any) => void;
  touchstart?: (touchstartEvent: JQueryEventObject) => void;
  touchend?: (touchendEvent: JQueryEventObject) => void;
}

export type EditorRef = {
  controller: FroalaEditorComponent | null;
};

export type OnModelChange = (model: string) => void;

export type InitControls = {
  initialize: () => void;
  destroy: () => void;
  getEditor: () => any;
};

export type OnManualControllerReady = (initControls: InitControls) => void;
