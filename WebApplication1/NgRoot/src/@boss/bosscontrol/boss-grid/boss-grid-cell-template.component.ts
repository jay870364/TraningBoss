import { Component, TemplateRef, ContentChild } from '@angular/core';

@Component({
    selector: 'boss-grid-cell-template',
    template: '<div></div>'
})
export class BossGridCellTemplateComponent {
    @ContentChild(TemplateRef) template: TemplateRef<any>;
}
