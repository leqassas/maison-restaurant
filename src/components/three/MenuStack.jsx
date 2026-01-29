import { useRef } from 'react';
import DishPlane from './DishPlane';
import { menuItems } from '../../data/menu';

export default function MenuStack({ scrollProgress, onDishChange }) {
    const groupRef = useRef();

    // SPATIAL CONFIGURATION
    // Z-spacing: -3.5 units (receding into background)
    // Y-spacing: 0.5 units (slight vertical step)
    const spacingZ = -3.5;
    const spacingY = 0.5;

    return (
        <group ref={groupRef}>
            {menuItems.map((dish, index) => (
                <DishPlane
                    key={dish.id}
                    dish={dish}
                    index={index}
                    // Static Position: The art gallery doesn't move.
                    position={[0, index * spacingY, index * spacingZ]}
                    scrollProgress={scrollProgress}
                    totalCount={menuItems.length}
                />
            ))}
        </group>
    );
}
