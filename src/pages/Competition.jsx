import '../style/competition.css';
import Topbar from '../components/Topbar';
import Card from '../components/Card';
import { useEffect, useState } from 'react';
import CheckBox from '../components/CheckBox';

function Competition() {
    const [isFilterOpen, setIsFilterOpen] = useState(false); // Змінено стан для фільтрів
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredHackathons, setFilteredHackathons] = useState([]);
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [sortConfig, setSortConfig] = useState({ field: '', order: 'asc' });
    const [categories, setCategories] = useState([]);


    const toggleFilter = () => setIsFilterOpen(!isFilterOpen); // Змінено назву функції

    const handleFilter = (filters) => {
        setSelectedFilters(filters);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const applyFiltersAndSearch = () => {
        let filtered = [...hackathons];

        if (selectedFilters.length > 0) {
            filtered = filtered.filter((hackathon) =>
                selectedFilters.some((filter) =>
                    hackathon.theme && hackathon.theme.includes(filter)
                )
            );
        }

        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((hackathon) =>
                hackathon.title.toLowerCase().includes(query) ||
                (hackathon.description && hackathon.description.toLowerCase().includes(query))
            );
        }

        // Додано сортування
        filtered = sortHackathons(filtered, sortBy);

        setFilteredHackathons(filtered);
    };

    // Функція для сортування
    const sortHackathons = (hackathons, sortType) => {
        const sorted = [...hackathons];

        switch (sortType) {
            case 'prize':
                return sorted.sort((a, b) => (b.prize || 0) - (a.prize || 0));
            case 'date':
                return sorted.sort((a, b) => {
                    const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date?.seconds * 1000);
                    const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date?.seconds * 1000);
                    return dateA - dateB;
                });
            default:
                return sorted;
        }
    };

    useEffect(() => {
        applyFiltersAndSearch();
    }, [selectedFilters, searchQuery, hackathons, sortBy]); // Додано sortBy в залежності


    const handleSortSelect = (field) => {
        setSortConfig(prev => {
            if (prev.field === field) {
                return {
                    field,
                    order: prev.order === 'asc' ? 'desc' : 'asc'
                };
            } else {
                return {
                    field,
                    order: 'asc'
                };
            }
        });
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchHackathons();
        }, 300); // запобігає моментальному рендеру сторінки

        return () => clearTimeout(delayDebounce);
    }, [selectedFilters, searchQuery, sortConfig]);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            const response = await fetch('https://web-teamwork-backend.onrender.com/api/v1/categories/');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategories([]);
        }
    }

    async function fetchHackathons() {
        setLoading(true);
        try {
            const params = new URLSearchParams();

            if (searchQuery.trim()) {
                params.append('search', searchQuery.trim());
            }

            selectedFilters.forEach((filter) => {
                params.append('category', filter);  // category = slug
            });

            if (sortConfig.field) {
                const prefix = sortConfig.order === 'desc' ? '-' : '';
                params.append('ordering', `${prefix}${sortConfig.field === 'date' ? 'start_datetime' : sortConfig.field}`);
            }

            const url = `https://web-teamwork-backend.onrender.com/api/v1/hackathons/?${params.toString()}`
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch hackathons');
            }
            console.log(response.data);

            const data = await response.json();
            setHackathons(data);
        } catch (error) {
            console.error('Error fetching hackathons:', error);
            setHackathons([]);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Topbar />
            <h1>Hackathons</h1>

            <div className="main-top">
                <div className={`filter ${isFilterOpen ? 'active' : ''}`} onClick={toggleFilter}>
                    <img alt=" " src="https://static.thenounproject.com/png/4800805-200.png" />
                    Filters
                    <div className={`filter-content ${isFilterOpen ? 'active' : ''}`}>
                        <h2>Filter by categories</h2>
                        <CheckBox handleFilter={handleFilter} categories={categories} />
                    </div>
                </div>

                <input
                    type="text"
                    placeholder="Search"
                    className="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />

                <div
                    className={`dropdown ${isDropdownOpen ? 'active' : ''}`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <p className="sort-details">sort by ▼</p>
                    <div className="dropdown-content">
                        <p onClick={(e) => {
                            e.stopPropagation();
                            handleSortSelect('prize');
                        }}>
                            By Prize {sortConfig.field === 'prize' && (sortConfig.order === 'asc' ? '↑' : '↓')}
                        </p>
                        <p onClick={(e) => {
                            e.stopPropagation();
                            handleSortSelect('date');
                        }}>
                            By Date {sortConfig.field === 'date' && (sortConfig.order === 'asc' ? '↑' : '↓')}
                        </p>

                    </div>
                </div>
            </div>

            <main>
                {hackathons.length > 0 ? (
                    <div className="card-grid">
                        {hackathons.map((hackathon) => (
                            <Card key={hackathon.id} hackathon={hackathon} />
                        ))}
                    </div>
                ) : (
                    <p className='noMatchingHackatons'>No hackathons found matching your criteria.</p>
                )}
            </main>
        </>
    );
}

export default Competition;