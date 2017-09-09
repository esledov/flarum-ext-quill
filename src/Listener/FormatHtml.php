<?php

namespace Sledov\Quill\Listener;

use Flarum\Event\ConfigureFormatter;
use Illuminate\Contracts\Events\Dispatcher;

class FormatHtml
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureFormatter::class, [$this, 'addHtmlFormatter']);
    }

    /**
     * @param ConfigureFormatter $event
     */
    public function addHtmlFormatter(ConfigureFormatter $event)
    {
        $configurator = $event->configurator;

        $configurator->rootRules->disableAutoLineBreaks();

        $htmlElements = array(
            'p',
            'br',
            'a',
            'b',
            'strong',
            'i',
            'em',
            'u',
            'h2',
            'h3',
            'ul',
            'ol',
            'li'
        );

        foreach ($htmlElements as $el) {
            $configurator->HTMLElements->allowElement($el);
        }

        $configurator->HTMLElements->allowAttribute('a', 'href');
        $configurator->HTMLElements->allowAttribute('a', 'title');
    }
}
