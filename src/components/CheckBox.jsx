import {Checkbox} from 'antd';
import React, {useState} from 'react';


// TODO: чекбокс вибраонї категорії має бути активним
function CheckBox({ handleFilter, categories }) {
    const [isChecked, setIsChecked] = useState([]);

    const handleToggle = (slug) => {
        setIsChecked(prev => {
            const currentIndex = prev.indexOf(slug);
            const newChecked = [...prev];

            if (currentIndex === -1) {
                newChecked.push(slug);
            } else {
                newChecked.splice(currentIndex, 1);
            }

            handleFilter(newChecked);
            return newChecked;
        });
    };

    return (
        <>
            {categories.map((category) => (
                <div className="filters-container" key={category.id}>
                    <Checkbox
                        onChange={() => handleToggle(category.slug)}
                        checked={isChecked.includes(category.slug)}
                    >
                        <span className="filters-theme">{category.title}</span>
                    </Checkbox>
                </div>
            ))}
        </>
    );
}

export default CheckBox;
