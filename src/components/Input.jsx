const Input = ({ type = 'text', value, onChange, placeholder }) => (
    <div>
        <label htmlFor='username' className='block text-sm font-medium text-gray-700 text-left'>
            Username
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className='px-4 py-2 border-2 rounded-md outline-none focus:border-lavender-5'
        />
    </div>
);
