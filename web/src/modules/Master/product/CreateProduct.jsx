import { useState } from 'react';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        category_id: '',
        sub_category_id: '',
        product_name: '',
        product_code: '',
        mrp: '',
        brand: '',
        qty: '',
        uom: '',
        master_packing_size: '',
        small_packing_size: '',
        product_size: '',
        product_thickness: '',
        description: '',
        feature: false,
        feature_name: '',
        feature_mrp: '',
        image: null
    });
    const handleInputChange = (e) => {
        const { name, type, checked, value, files } = e.target;

        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async () => {
        try {
            const submitData = new FormData();

        
            Object.keys(formData).forEach(key => {
                if (key === 'image' && formData[key]) {
                    submitData.append(key, formData[key]); 
                } else {
                    submitData.append(key, formData[key]); 
                }
            });
   
            toast.success('Product created successfully!');
            navigate('/product')
            console.log({ data });
        } catch (error) {
            toast.error('Something went wrong');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="w-full sm:px-6 lg:px-8">
                {/* Form Card */}
                <div className="bg-card rounded-lg shadow-lg overflow-hidden border-x-4 border-primary-500">
                    <div className="p-6">
                        <div className="space-y-6">
                            <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
                                {/* Category ID */}
                                <div>
                                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
                                        Category ID
                                    </label>
                                    <input
                                        type="text"
                                        id="category_id"
                                        name="category_id"
                                        value={formData.category_id}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        required
                                    />
                                </div>

                                {/* Sub Category ID - only show if category is selected */}
                                {formData.category_id && formData.category_id.trim() !== '' && (
                                    <div>
                                        <label htmlFor="sub_category_id" className="block text-sm font-medium text-gray-700 mb-2">
                                            Sub Category ID
                                        </label>
                                        <input
                                            type="text"
                                            id="sub_category_id"
                                            name="sub_category_id"
                                            value={formData.sub_category_id}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                )}

                                {/* Product Name */}
                                <div>
                                    <label htmlFor="product_name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        id="product_name"
                                        name="product_name"
                                        value={formData.product_name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        required
                                    />
                                </div>

                                {/* Product Code */}
                                <div>
                                    <label htmlFor="product_code" className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Code
                                    </label>
                                    <input
                                        type="text"
                                        id="product_code"
                                        name="product_code"
                                        value={formData.product_code}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        required
                                    />
                                </div>

                                {/* MRP */}
                                <div>
                                    <label htmlFor="mrp" className="block text-sm font-medium text-gray-700 mb-2">
                                        MRP (₹)
                                    </label>
                                    <input
                                        type="number"
                                        id="mrp"
                                        name="mrp"
                                        value={formData.mrp}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        required
                                        min="0"
                                        step="0.01"
                                    />
                                </div>

                                {/* Brand */}
                                <div>
                                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                                        Brand
                                    </label>
                                    <input
                                        type="text"
                                        id="brand"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        required
                                    />
                                </div>

                                {/* Quantity */}
                                <div>
                                    <label htmlFor="qty" className="block text-sm font-medium text-gray-700 mb-2">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        id="qty"
                                        name="qty"
                                        value={formData.qty}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        required
                                        min="0"
                                    />
                                </div>

                                {/* UOM */}
                                <div>
                                    <label htmlFor="uom" className="block text-sm font-medium text-gray-700 mb-2">
                                        Unit of Measure (UOM)
                                    </label>
                                    <input
                                        type="text"
                                        id="uom"
                                        name="uom"
                                        value={formData.uom}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                {/* Master Packing Size */}
                                <div>
                                    <label htmlFor="master_packing_size" className="block text-sm font-medium text-gray-700 mb-2">
                                        Master Packing Size
                                    </label>
                                    <input
                                        type="text"
                                        id="master_packing_size"
                                        name="master_packing_size"
                                        value={formData.master_packing_size}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                {/* Small Packing Size */}
                                <div>
                                    <label htmlFor="small_packing_size" className="block text-sm font-medium text-gray-700 mb-2">
                                        Small Packing Size
                                    </label>
                                    <input
                                        type="text"
                                        id="small_packing_size"
                                        name="small_packing_size"
                                        value={formData.small_packing_size}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                {/* Product Size */}
                                <div>
                                    <label htmlFor="product_size" className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Size
                                    </label>
                                    <input
                                        type="text"
                                        id="product_size"
                                        name="product_size"
                                        value={formData.product_size}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                {/* Product Thickness */}
                                <div>
                                    <label htmlFor="product_thickness" className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Thickness
                                    </label>
                                    <input
                                        type="text"
                                        id="product_thickness"
                                        name="product_thickness"
                                        value={formData.product_thickness}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                {/* Image */}
                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Image
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        accept="image/*"
                                    />
                                    {formData.image && (
                                        <div className="mt-2">
                                            <img
                                                src={URL.createObjectURL(formData.image)}
                                                alt="Preview"
                                                className="h-full w-full object-cover rounded"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter product description..."
                                />
                            </div>

                            {/* Feature */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Feature
                                </label>
                                <div className="flex space-x-4 mb-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="feature"
                                            value="true"
                                            checked={formData.feature === true}
                                            onChange={() => setFormData(prev => ({ ...prev, feature: true }))}
                                            className="mr-2"
                                        />
                                        True
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="feature"
                                            value="false"
                                            checked={formData.feature === false}
                                            onChange={() => setFormData(prev => ({ ...prev, feature: false }))}
                                            className="mr-2"
                                        />
                                        False
                                    </label>
                                </div>

                                {/* Conditional inputs - only show when feature is true */}
                                {formData.feature === true && (
                                    <div className="flex space-x-4">
                                        <div className="w-1/2">
                                            <label htmlFor="featureName" className="block text-sm font-medium text-gray-700 mb-2">
                                                Feature Name
                                            </label>
                                            <input
                                                type="text"
                                                id="featureName"
                                                name="feature_name"
                                                value={formData.feature_name}
                                                onChange={handleInputChange}
                                                onClick={() => console.log('Input clicked')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                placeholder="Enter feature name..."
                                            />
                                        </div>

                                        <div className="w-1/2">
                                            <label htmlFor="featureMrp" className="block text-sm font-medium text-gray-700 mb-2">
                                                Feature MRP
                                            </label>
                                            <input
                                                type="number"
                                                id="featureMrp"
                                                name="feature_mrp"
                                                value={formData.feature_mrp}
                                                onChange={handleInputChange}
                                                onClick={() => console.log('Input clicked')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                placeholder="Enter feature MRP..."
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>


                        </div>
                    </div>

                    {/* Form Footer */}
                    <div className="bg-gray-50 p-4 flex items-center justify-end space-x-3">
                        <div className="p-[1px] rounded-lg bg-gradient-to-br from-blue-500 to-orange-400 group">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="px-6 py-2 text-sm font-medium text-black bg-white rounded-lg transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-orange-400 group-hover:text-white"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;