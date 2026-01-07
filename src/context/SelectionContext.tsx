import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Tables } from '@/integrations/supabase/types';

type PolishColor = Tables<'polish_colors'>;

interface SelectionContextType {
    selectedPolishes: PolishColor[];
    toggleSelection: (polish: PolishColor) => void;
    isSelected: (polishId: string) => boolean;
    clearSelection: () => void;
    selectionCount: number;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
    const [selectedPolishes, setSelectedPolishes] = useState<PolishColor[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('polish_selection');
        if (saved) {
            try {
                setSelectedPolishes(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse saved selection', e);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('polish_selection', JSON.stringify(selectedPolishes));
    }, [selectedPolishes]);

    const toggleSelection = (polish: PolishColor) => {
        setSelectedPolishes((prev) => {
            const exists = prev.some((p) => p.id === polish.id);
            if (exists) {
                return prev.filter((p) => p.id !== polish.id);
            } else {
                return [...prev, polish];
            }
        });
    };

    const isSelected = (polishId: string) => {
        return selectedPolishes.some((p) => p.id === polishId);
    };

    const clearSelection = () => {
        setSelectedPolishes([]);
    };

    return (
        <SelectionContext.Provider
            value={{
                selectedPolishes,
                toggleSelection,
                isSelected,
                clearSelection,
                selectionCount: selectedPolishes.length
            }}
        >
            {children}
        </SelectionContext.Provider>
    );
};

export const useSelection = () => {
    const context = useContext(SelectionContext);
    if (context === undefined) {
        throw new Error('useSelection must be used within a SelectionProvider');
    }
    return context;
};
