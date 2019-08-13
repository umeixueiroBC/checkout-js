import React from 'react';

import './PopoverList.scss';

interface PopoverListProps {
    menuProps?: any;
    highlightedIndex?: number;
    getItemProps?: any;
    items: PopoverListItem[];
    testId?: string;
}

export interface PopoverListItem {
    id: string;
    content: React.ReactChild[] | React.ReactChild;
}

const PopoverList: React.SFC<PopoverListProps> = ({
    highlightedIndex = -1,
    testId,
    getItemProps = (props: any) => props,
    menuProps = {},
    items,
}) => {
    if (!items || !items.length) {
        return null;
    }

    return (
        <ul
            data-test={ testId }
            className="popoverList" { ...menuProps }
        >{ items
            .map((item, index) => (
                <li
                    data-test={ testId && `${testId}-item` }
                    className={ getItemClassName(highlightedIndex, index) }
                    { ...getItemProps({
                        key: item.id,
                        index,
                        item,
                    })}
                    key={ index }
                >
                    { item.content }
                </li>
            ))}
        </ul>
    );
};

function getItemClassName(highlightedIndex: number, index: number): string {
    const classes = ['popoverList-item'];

    if (highlightedIndex === index) {
        classes.push('is-active');
    }

    return classes.join(' ');
}

export default PopoverList;