import { Directive, ElementRef, HostBinding, HostListener, Input, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { BossAutoFloating, IBossAutoFloatingElement } from '../services/bossAutoFloating';
@Directive({
  selector: '[bossAutoFloating]'
})
export class BossAutoFloatingDirective implements AfterViewInit, OnDestroy {
  placeHolder: HTMLDivElement;
  @HostBinding('class.floating') public floating = false;
  // tslint:disable-next-line:no-input-rename
  @Input('bossAutoFloating') public referenceName: string;
  // tslint:disable-next-line:no-input-rename
  @Input('bossAutoFloatingOffset') public offset = 0;
  public originalTop = 0;
  public originalStyleTop;
  protected get elementTop() { return this.elementRef.nativeElement.style.top; }
  protected set elementTop(value) { this.elementRef.nativeElement.style.top = value; }
  public toggleFloat(state: boolean, shouldBeTop: number) {
    if (this.floating !== state) {
      this.floating = state;
      if (state) {
        this.elementTop = `${shouldBeTop + this.offset}px`;
      } else {
        this.elementTop = this.originalTop + 'px';
      }
    }
  }
  constructor(protected elementRef: ElementRef, protected autoFloatingService: BossAutoFloating, protected cdr: ChangeDetectorRef) {

  }
  ngAfterViewInit() {
    this.autoFloatingService.addFloatingElement(this.referenceName, this);
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    this.originalTop = rect.top;
    this.originalStyleTop = this.elementTop;
    this.placeHolder = document.createElement('div');
    this.placeHolder.style.height = rect.height + parseFloat(window.getComputedStyle(this.elementRef.nativeElement).marginTop.replace('px', '')) + 'px';
    this.placeHolder.classList.add('floating-placeholder');
    this.elementRef.nativeElement.parentNode.insertBefore(this.placeHolder, this.elementRef.nativeElement);
    this.elementTop = this.originalTop + 'px';
  }
  ngOnDestroy() {
    this.autoFloatingService.removeFloatingElement(this.referenceName, this);
    this.placeHolder.remove();
  }
}
@Directive({
  selector: '[bossAutoFloatingHost]'
})
export class BossAutoFloatingHostDirective implements AfterViewInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('bossAutoFloatingHost') referenceName: string;
  // tslint:disable-next-line:no-input-rename
  @Input('bossAutoFloatingHostOffset') offset = 0;
  protected reference: IBossAutoFloatingElement;
  protected top: number;
  @HostListener('scroll', ['$event']) scroll($event) {
    const top = this.elementRef.nativeElement.scrollTop + this.top;
    this.reference.elements.forEach(e => {
      e.toggleFloat(top > e.originalTop, this.top + this.offset);
    });
  }
  constructor(protected elementRef: ElementRef, protected autoFloatingService: BossAutoFloating) {

  }
  ngAfterViewInit() {
    this.top = this.elementRef.nativeElement.getBoundingClientRect().top;
    this.reference = this.autoFloatingService.reference[this.referenceName] = {
      elements: [],
      hostElement: this.elementRef
    };
  }
  ngOnDestroy() {
    delete this.autoFloatingService[this.referenceName];
  }
}

