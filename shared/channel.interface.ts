/**
 * Represents channel object
 * TODO: define channel interface in iptv-parser library
 */
export interface Channel {
    id: string;
    url: string;
    name: string;
    group: {
        title: string;
    };
    tvg: {
        id: string;
        name: string;
        url: string;
        logo: string;
        rec: string;
    };
    epgParams?: string;
    timeshift?: string;
    catchup?: {
        type?: string;
        source?: string;
        days?: string;
    };
    http: {
        referrer: string;
        'user-agent': string;
        origin: string;
    };
    radio: string;
}

// 在频道列表组件中添加类型守卫  
private isValidChannel(channel: any): channel is Channel {  
    return channel &&   
           typeof channel.name === 'string' &&  
           typeof channel.url === 'string' &&  
           channel.group &&  
           typeof channel.group.title === 'string';  
}
