import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useForm, useFieldArray } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
    const { data, updateData, loading } = useContent();
    const [activeTab, setActiveTab] = useState('header');

    if (loading) return <div>Loading Admin...</div>;
    if (!data) return <div>No data available</div>;

    return (
        <div className="min-h-screen bg-zinc-900 text-white p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">NewRoad CMS</h1>
                <a href="/" className="text-primary hover:underline">Back to Site</a>
            </div>

            <div className="flex space-x-4 mb-8 border-b border-zinc-700 pb-4">
                {['header', 'hero', 'works'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded capitalize ${activeTab === tab ? 'bg-primary text-black' : 'bg-zinc-800 hover:bg-zinc-700'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="bg-black p-6 rounded-xl border border-zinc-800">
                {activeTab === 'header' && <HeaderEditor initialData={data} updateData={updateData} />}
                {activeTab === 'hero' && <HeroEditor initialData={data} updateData={updateData} />}
                {activeTab === 'works' && <WorksEditor initialData={data} updateData={updateData} />}
            </div>
            <ToastContainer position="bottom-right" theme="dark" />
        </div>
    );
};

const HeaderEditor = ({ initialData, updateData }: any) => {
    const { register, control, handleSubmit } = useForm({
        defaultValues: initialData.header
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "links"
    });

    const onSubmit = (formData: any) => {
        const newData = { ...initialData, header: formData };
        updateData(newData)
            .then(() => toast.success('Header updated!'))
            .catch(() => toast.error('Failed to update'));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Header Configuration</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-2 text-sm text-zinc-400">Light Logo URL</label>
                    <input {...register('logoLight')} className="w-full bg-zinc-900 border border-zinc-700 p-2 rounded text-white" />
                </div>
                <div>
                    <label className="block mb-2 text-sm text-zinc-400">Dark Logo URL</label>
                    <input {...register('logoDark')} className="w-full bg-zinc-900 border border-zinc-700 p-2 rounded text-white" />
                </div>
            </div>

            <div>
                <label className="block mb-2 text-sm text-zinc-400">Navigation Links</label>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mb-2">
                        <input {...register(`links.${index}.label`)} placeholder="Label" className="w-1/3 bg-zinc-900 border border-zinc-700 p-2 rounded text-white" />
                        <input {...register(`links.${index}.url`)} placeholder="URL" className="w-1/2 bg-zinc-900 border border-zinc-700 p-2 rounded text-white" />
                        <button type="button" onClick={() => remove(index)} className="bg-red-900/50 text-red-500 px-4 rounded hover:bg-red-900">X</button>
                    </div>
                ))}
                <button type="button" onClick={() => append({ label: '', url: '' })} className="text-primary text-sm mt-2 hover:underline">+ Add Link</button>
            </div>

            <button type="submit" className="bg-primary text-black px-6 py-2 rounded font-bold hover:opacity-90">Save Changes</button>
        </form>
    );
};

const HeroEditor = ({ initialData, updateData }: any) => {
    const { register, handleSubmit } = useForm({
        defaultValues: initialData.hero
    });

    const onSubmit = (formData: any) => {
        const newData = { ...initialData, hero: formData };
        updateData(newData)
            .then(() => toast.success('Hero updated!'))
            .catch(() => toast.error('Failed to update'));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Hero Configuration</h2>
            <div>
                <label className="block mb-2 text-sm text-zinc-400">Video URL (mp4)</label>
                <input {...register('videoUrl')} className="w-full bg-zinc-900 border border-zinc-700 p-2 rounded text-white" />
            </div>
            <div>
                <label className="block mb-2 text-sm text-zinc-400">Poster URL (webp/jpg)</label>
                <input {...register('posterUrl')} className="w-full bg-zinc-900 border border-zinc-700 p-2 rounded text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-2 text-sm text-zinc-400">Title Line 1</label>
                    <input {...register('titleLine1')} className="w-full bg-zinc-900 border border-zinc-700 p-2 rounded text-white" />
                </div>
                <div>
                    <label className="block mb-2 text-sm text-zinc-400">Title Line 2</label>
                    <input {...register('titleLine2')} className="w-full bg-zinc-900 border border-zinc-700 p-2 rounded text-white" />
                </div>
            </div>

            <button type="submit" className="bg-primary text-black px-6 py-2 rounded font-bold hover:opacity-90">Save Changes</button>
        </form>
    );
};

const WorksEditor = ({ initialData, updateData }: any) => {
    // WorksEditor handles its own form state for the array
    const { register, control, handleSubmit } = useForm({
        defaultValues: { works: initialData.works }
    });

    const { fields: workFields, append: appendWork, remove: removeWork } = useFieldArray({
        control,
        name: "works"
    });

    const onSubmit = (formData: any) => {
        const newData = { ...initialData, works: formData.works };
        updateData(newData)
            .then(() => toast.success('Works updated!'))
            .catch(() => toast.error('Failed to update'));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Works/Projects</h2>

            <div className="grid gap-6">
                {workFields.map((field, index) => (
                    <div key={field.id} className="bg-zinc-900 p-4 rounded border border-zinc-700 relative">
                        <button
                            type="button"
                            onClick={() => removeWork(index)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-400"
                        >
                            Remove
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-zinc-500 mb-1">Title</label>
                                <input {...register(`works.${index}.title` as const)} className="w-full bg-black border border-zinc-700 p-2 rounded text-white" />
                            </div>
                            <div>
                                <label className="block text-xs text-zinc-500 mb-1">Category</label>
                                <input {...register(`works.${index}.category` as const)} className="w-full bg-black border border-zinc-700 p-2 rounded text-white" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs text-zinc-500 mb-1">Image URL</label>
                                <input {...register(`works.${index}.image` as const)} className="w-full bg-black border border-zinc-700 p-2 rounded text-white" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs text-zinc-500 mb-1">Project Link</label>
                                <input {...register(`works.${index}.link` as const)} className="w-full bg-black border border-zinc-700 p-2 rounded text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button type="button" onClick={() => appendWork({ id: Date.now(), title: 'New Project', category: 'Category', image: '', link: '#' })} className="w-full py-3 border border-dashed border-zinc-700 text-zinc-400 hover:text-white hover:border-white transition-colors">
                + Add Project
            </button>

            <button type="submit" className="bg-primary text-black px-6 py-2 rounded font-bold hover:opacity-90 sticky bottom-4">Save All Changes</button>
        </form>
    );
};

export default AdminDashboard;
