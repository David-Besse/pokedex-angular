// This TypeScript class defines a directive called BorderCardDirective, which handles mouse enter and mouse leave events by scaling
// the element, setting box shadow, and updating the z-index.
// onMouseEnter(): Handles the mouse enter event by scaling, setting box shadow, and updating z-index.
// onMouseLeave(): Handles the mouse leave event by resetting the scale, box shadow, and z-index.
// setScale(scale: number): Sets the scale of the element.
// setBoxShadow(boxShadow: string): Sets the box shadow style for the element.
// setZindex(zindex: number): Sets the z-index of the element.

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBorderCard]',
  standalone: true,
})
export class BorderCardDirective {
  constructor(private el: ElementRef) {}

/**
 * Handle the mouse enter event by scaling, setting box shadow, and updating z-index.
 */
  @HostListener('mouseenter') onMouseEnter() {
    this.setScale(1.1);
    this.setBoxShadow('0 0 4px 4px rgba(0, 0, 8, 0.4)');
    this.setZindex(1);
  }

/**
 * onMouseLeave function sets the scale to 1, resets the box shadow, and sets the z-index to 0.
 */
  @HostListener('mouseleave') onMouseLeave() {
    this.setScale(1);
    this.setBoxShadow('unset');
    this.setZindex(0);
  }

  /**
   * Set the scale of the element.
   *
   * @param {number} scale - The scale value to set
   * @return {void} 
   */
  setScale(scale: number): void {
    this.el.nativeElement.style.transform = `scale(${scale})`;
  }

  /**
   * Set the box shadow style for the element.
   *
   * @param {string} boxShadow - the box shadow style to be set
   * @return {void} 
   */
  setBoxShadow(boxShadow: string): void {
    this.el.nativeElement.style.boxShadow = `${boxShadow}`;
  }

  /**
   * Sets the z-index of the element.
   *
   * @param {number} zindex - the z-index to set
   * @return {void} 
   */
  setZindex(zindex: number): void {
    this.el.nativeElement.style.zIndex = `${zindex}`;
  }
}
