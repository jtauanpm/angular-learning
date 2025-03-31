import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "filesize",
  standalone: true,
})
export class FileSizePipe implements PipeTransform {
  private readonly MbUnit: string = "MB";
  private readonly GbUnit: string = "GB";

  transform(sizeString: string) {
    const size = Number(sizeString);

    let calculatedSize = size / (1024 * 1024);
    let unit = this.MbUnit;

    if (calculatedSize > 1024) {
      calculatedSize /= 1024;
      unit = this.GbUnit;
    }

    return calculatedSize.toFixed(2) + unit;
  }
}
