import { Directive, ElementRef ,HostListener} from '@angular/core';

/*
  Generated class for the Book directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
  selector: '[book]' // Attribute selector
})
export class Book {

  constructor(private el: ElementRef) {
    console.log('Hello Book Directive');
  }

  @HostListener('mouseover',['$event,target'])
  onmouseover(){
    this.el.nativeElement.style.backgroundColor= "red";
  }

}
