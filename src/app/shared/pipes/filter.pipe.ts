import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterBy',
    standalone: true,
})
@Injectable()
export class FilterPipe implements PipeTransform {
    transform(array: any[], filter: string, property: string): any {  
        if (!array || !filter) {  
            return array;  
        }  
        return array.filter((item) => {  
            // 添加安全检查，确保属性存在且是字符串  
            const value = item[property];  
            if (typeof value !== 'string') {  
                return false;  
            }  
            return value.toLowerCase().includes(filter.toLowerCase());  
        });  
    }
}
