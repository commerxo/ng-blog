
import { Pipe, PipeTransform, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({name:'safeHtmlTable',
    pure:false
})
export class SafeHtmlTablePipe implements PipeTransform{

    constructor(private sanitizer:DomSanitizer){}

    transform(value: any) {
        // const tableContent = `<table>${value}</table>`;
        // const sanitizedContent = this.sanitizer.sanitize(SecurityContext.HTML, tableContent);
        // const stripContent = sanitizedContent.replace(/^<table>(.*)<\/table>$/,'$1');
        return this.sanitizer.bypassSecurityTrustStyle(value);
    }


}