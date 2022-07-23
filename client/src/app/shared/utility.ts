export class Utility {
    static getColor(method) {
    
        switch (method) {
          case 'get':
            return 'green';
          case 'post':
            return 'blue';
          case 'delete':
            return 'red';
          default:
            return 'grey';
    
        }
      }
}
