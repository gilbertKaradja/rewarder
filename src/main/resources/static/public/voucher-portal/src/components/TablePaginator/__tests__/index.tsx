port React from 'react';
import { shallow, mount } from 'enzyme';

import TablePaginator from '../index';

describe('TablePaginator component' , () => {

    it('should render without issues', () => {
        const component = shallow(
            <TablePaginator />
        )
    })
});