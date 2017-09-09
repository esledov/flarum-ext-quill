import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import ItemList from 'flarum/utils/ItemList';
import listItems from 'flarum/helpers/listItems';

/**
 * The `QuillEditor` component displays a WYSIWYG textarea
 *
 * ### Props
 *
 * - `submitLabel`
 * - `value`
 * - `placeholder`
 * - `disabled`
 */
export default class QuillEditor extends Component {

    init() {
        this.value = m.prop(this.props.value || '');

        // provide default class name
        this.props.className = this.props.className || "sledov-quill-editor";

        // editor instance to be initialized later
        this.quill = null;

    }

    view() {
        const classNames = 'Composer-flexible ' + this.props.className;
        return (
            <div className="TextEditor">
                <div className={classNames} config={this.configEditor.bind(this)} />
                <ul className="TextEditor-controls Composer-footer">
                    {listItems(this.controlItems().toArray())}
                </ul>
            </div>
        )
    }

    configEditor(element, isInitialized) {

        if (isInitialized) return;

        this.quill = new Quill('.' + this.props.className, {
            modules: {
                toolbar: true
            },
            placeholder: this.props.placeholder || '',
            readOnly: !!this.props.disabled,
            theme: 'snow'
        });

        this.quill.clipboard.dangerouslyPasteHTML(0, this.value());
        this.quill.on('text-change', this.oninput.bind(this));

    }

    /**
     * Build an item list for the text editor controls.
     *
     * @return {ItemList}
     */
    controlItems() {
        const items = new ItemList();

        items.add('submit',
            Button.component({
                children: this.props.submitLabel,
                icon: 'check',
                className: 'Button Button--primary',
                itemClassName: 'App-primaryControl',
                onclick: this.onsubmit.bind(this)
            })
        );

        if (this.props.preview) {
            items.add('preview',
                Button.component({
                    icon: 'eye',
                    className: 'Button Button--icon',
                    onclick: this.props.preview
                })
            );
        }

        return items;
    }

    /**
     * Handle input into the editor.
     */
    oninput() {
        let html = this.quill.root.innerHTML;
        this.value(html);
        this.props.onchange(html);
        m.redraw.strategy('none');
    }

    /**
     * Handle the submit button being clicked.
     */
    onsubmit() {
        this.props.onsubmit(this.value());
    }
}
