import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBorderCard]',
  standalone: true,
})
export class BorderCardDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.setScale(1.05);
    this.setBoxShadow('0 0 4px 4px inset rgba(0,0,0,0.2)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setScale(1);
    this.setBoxShadow('0 0 2px 2px rgba(0,0,0,0.2)')
  }

  setScale(scale: number) {
    this.el.nativeElement.style.transform = `scale(${scale})`;
  }

  setBoxShadow(boxShadow: string) {
    this.el.nativeElement.style.boxShadow = `${boxShadow}`;
  }
}
