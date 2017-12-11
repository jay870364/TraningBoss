import { Component, TemplateRef, ContentChild } from '@angular/core';

@Component({
    selector: 'boss-grid-header-template',
    template: '<div></div>'
})
export class BossGridHeaderTemplateComponent {
    @ContentChild(TemplateRef) template: TemplateRef<any>;
}
