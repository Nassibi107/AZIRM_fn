// optimse the code
const  toggleSelection = (bouquetId, setSelectedIds) => {
    setSelectedIds((prev) =>
        prev.includes(bouquetId) ? prev.filter((id) => id !== bouquetId) : [...prev, bouquetId]
    );
};

const  getSelectedBouquets = (Bouquet, selectedIds) => {
    return Bouquet.filter(bouquet => selectedIds.includes(bouquet.id));
};

const  getUnselectedBouquets = (Bouquet, selectedIds) => {
    return Bouquet.filter(bouquet => !selectedIds.includes(bouquet.id));
};

const  updateBouquets = (newBouquets, setBouquet) => {
    setBouquet(newBouquets);
};

const helpers = {
    actionBq : {
            handleSelectAll :  (type, Bouquet, setSelectedIds) => {
                let allBouquets =[];
                    allBouquets = Bouquet.map(item => item.id);
                    console.log( allBouquets);
                setSelectedIds(allBouquets);
            },
            handleUnselectAll : (setSelectedIds) => {
                setSelectedIds([]);
            },
            sortMaxBottom : (Bouquet, selectedIds, setBouquet) => {
                const selectedBouquets = getSelectedBouquets(Bouquet, selectedIds);
                const unselectedBouquets = getUnselectedBouquets(Bouquet, selectedIds);
                const sortedBouquets = [...unselectedBouquets, ...selectedBouquets];
                updateBouquets(sortedBouquets, setBouquet);
            },
            sortMaxTop : (Bouquet, selectedIds, setBouquet) => {
                const selectedBouquets = getSelectedBouquets(Bouquet, selectedIds);
                const unselectedBouquets = getUnselectedBouquets(Bouquet, selectedIds);
                const sortedBouquets = [...selectedBouquets, ...unselectedBouquets];
                updateBouquets(sortedBouquets, setBouquet);
            },
            sortTop  : (Bouquet, selectedIds, setBouquet) => {
                const selectedBouquets = getSelectedBouquets(Bouquet, selectedIds);
                const updatedBouquets = [...Bouquet];

                for (let i = 0; i < updatedBouquets.length; i++) {
                    const bouquet = updatedBouquets[i];

                    if (selectedBouquets.includes(bouquet)) {
                        const selectedIndex = selectedBouquets.indexOf(bouquet);

                        if (i - selectedIndex > 0) {
                            updatedBouquets.splice(i, 1);
                            updatedBouquets.splice(i - 1, 0, bouquet);
                        }
                    }
                }
                updateBouquets(updatedBouquets, setBouquet);
            },
            sortBottom : (Bouquet, selectedIds, setBouquet) => {
            const selectedBouquets = getSelectedBouquets(Bouquet, selectedIds);
            const updatedBouquets = [...Bouquet];

            for (let i = updatedBouquets.length - 1; i >= 0; i--) {
                const bouquet = updatedBouquets[i];

                if (selectedBouquets.includes(bouquet)) {
                    const selectedIndex = selectedBouquets.indexOf(bouquet);

                    if (i + selectedIndex < updatedBouquets.length) {
                        updatedBouquets.splice(i, 1);
                        updatedBouquets.splice(i + 1, 0, bouquet);
                    }
                }
            }
            updateBouquets(updatedBouquets, setBouquet);
        },
    },
    effectBq :{
        toggleSelection : (bouquetId, setSelectedIds) => {
            setSelectedIds((prev) =>
                prev.includes(bouquetId) ? prev.filter((id) => id !== bouquetId) : [...prev, bouquetId]
            );
        },

        getSelectedBouquets : (Bouquet, selectedIds) => {
            return Bouquet.filter(bouquet => selectedIds.includes(bouquet.id));
        },

        getUnselectedBouquets : (Bouquet, selectedIds) => {
            return Bouquet.filter(bouquet => !selectedIds.includes(bouquet.id));
        },

        updateBouquets : (newBouquets, setBouquet) => {
            setBouquet(newBouquets);
        },
    }
}




export default helpers;
