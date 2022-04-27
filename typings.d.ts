declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

interface Window {
  MobWeb: {
    initFlag: boolean,
    baseUrl: string
  }
}

declare module 'GGGLOBAL';
declare module 'GGService';
declare module 'lodash';

declare module 'react-dnd';
