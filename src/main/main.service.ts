import { Injectable } from '@nestjs/common';

@Injectable()
export class MainService {
  getMain(): string {
    return 'main';
  }

  getSchoolData(): object {
    const data = {
      name: 'DKSH',
      category: 'game programing',
    };
    return data;
  }

  getTodaysWork(): object {
    return {
      todo: [
        {
          name: '수학 수행평가',
          description: '수학 과제',
        },
      ],
    };
  }
}
