import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    standalone: true,
    name: 'imageformater'
})
export class ImageFormaterPipe implements PipeTransform {
    transform(image: string, path: string = '', replace: boolean): string {
        if(path == 'default'){
            path = 'assets/';
        }
        if(image.length == 0 && replace){
            image = 'semCapa.jpg';
        }

        const result = '/' + path + '/' + image;
        return result;
    }

}