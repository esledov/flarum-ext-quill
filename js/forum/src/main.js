import {extend} from 'flarum/extend';
import app from 'flarum/app';
import ComposerBody from 'flarum/components/ComposerBody';
import QuillEditor from 'sledov/quill/components/QuillEditor';

app.initializers.add('sledov-quill', () => {
    extend(ComposerBody.prototype, 'init', function init() {
        this.editor = new QuillEditor({
            submitLabel: this.props.submitLabel,
            placeholder: this.props.placeholder,
            onchange: this.content,
            onsubmit: this.onsubmit.bind(this),
            value: this.content()
        });
    });
});
