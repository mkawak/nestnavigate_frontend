import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import API_BASE_URL from '../config';

function Dashboard({ token }) {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [modules, setModules] = useState([]);
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        if (!token) navigate('/login');
    }, [token, navigate]);

    const headers = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

    useEffect(() => {
        const fetchInitialData = async () => {
            const [profileRes, modRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/users/profile`, { headers }),
                fetch(`${API_BASE_URL}/api/modules`)
            ]);

            const userData = await profileRes.json();
            setProfile(userData);

            const modulesData = await modRes.json();
            setModules(modulesData);

            const progRes = await fetch(`${API_BASE_URL}/api/progress/${userData.id}`);
            const progressData = await progRes.json();
            setProgress(progressData);
        };

        fetchInitialData();
    }, [token, headers]);

    const refreshData = async () => {
        const profileRes = await fetch(`${API_BASE_URL}/api/users/profile`, { headers });
        const freshProfile = await profileRes.json();
        setProfile(freshProfile);

        const progRes = await fetch(`${API_BASE_URL}/api/progress/${freshProfile.id}`);
        const progressData = await progRes.json();
        setProgress(progressData);
    };

    const completeLesson = async (moduleId, lesson) => {
        await fetch(
            `${API_BASE_URL}/api/progress/complete-lesson?user_id=${profile.id}&module_id=${moduleId}&lesson=${encodeURIComponent(lesson)}`,
            { method: 'POST' }
        );
        await refreshData();
    };

    const getCompletion = modId => {
        const modProgress = Array.isArray(progress)
            ? progress.find(p => p.module_id === modId)
            : null;
        return modProgress ? modProgress.completion_percentage : 0;
    };

    const overallProgress = () => {
        if (!progress.length || !modules.length) return 0;
        const total = progress.reduce((sum, p) => sum + p.completion_percentage, 0);
        return Math.round(total / modules.length);
    };

    return (
        <div className="dashboard">
            {profile && (
                <div className="profile-section">
                    <h2>{profile.name}'s Dashboard</h2>
                    <p>Coins Earned: {profile.coins_earned}</p>
                    <p>Overall Progress: {overallProgress()}%</p>
                </div>
            )}

            <div className="modules-grid">
                <h3>Modules</h3>
                {modules.map(m => (
                    <div key={m.id} className="module-card">
                        <h4>{m.title}</h4>
                        <div className="progress-bar">
                            <div
                                className="progress"
                                style={{ width: `${getCompletion(m.id)}%` }}
                            ></div>
                        </div>
                        <ul>
                            {m.lessons.map(lesson => (
                                <li key={lesson}>
                                    {lesson}{' '}
                                    <button onClick={() => completeLesson(m.id, lesson)}>
                                        Complete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="activity-feed">
                <h3>Recent Activity</h3>
                {Array.isArray(progress) && progress.flatMap(p =>
                    p.lessons_completed.map(lesson => (
                        <div key={`${p.module_id}-${lesson}`} className="activity-item">
                            <p>✔️ {lesson} from {p.module_id}</p>
                            <span>{new Date(p.last_accessed).toLocaleString()}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Dashboard;