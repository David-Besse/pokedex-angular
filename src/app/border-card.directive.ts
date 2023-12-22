import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBorderCard]',
  standalone: true,
})
export class BorderCardDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder('#009688');
    this.setScale(1.05);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder('#f5f5f5');
    this.setScale(1);
  }

  setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }

  setScale(scale: number) {
    this.el.nativeElement.style.transform = `scale(${scale})`;
  }
}
