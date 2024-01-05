import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBorderCard]',
  standalone: true,
})
export class BorderCardDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.setScale(1.1);
    this.setBoxShadow('0 0 4px 4px rgba(0, 0, 8, 0.4)');
    this.setZindex(1);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setScale(1);
    this.setBoxShadow('unset');
    this.setZindex(0);
  }

  setScale(scale: number) {
    this.el.nativeElement.style.transform = `scale(${scale})`;
  }

  setBoxShadow(boxShadow: string) {
    this.el.nativeElement.style.boxShadow = `${boxShadow}`;
  }

  setZindex(zindex: number) {
    this.el.nativeElement.style.zIndex = `${zindex}`;
  }
}
