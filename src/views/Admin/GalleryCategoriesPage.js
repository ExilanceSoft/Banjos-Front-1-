import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CImage,
  CBadge,
  CSpinner,
  CInputGroup,
  CInputGroupText,
  CToaster,
  CToast,
  CToastBody,
  CToastClose
} from '@coreui/react-pro';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilPencil, cilTrash, cilSearch, cilImage ,cilWarning,cilInfo} from '@coreui/icons';

const GalleryCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    image: null
  });

  const BASE_URL = "http://64.227.163.17:8000";

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/gallery_cat/categories`);
      setCategories(response.data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError('Failed to fetch categories. Please try again later.');
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Failed to fetch categories
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      image: null
    });
    setImagePreview(null);
    setCurrentImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await axios.post(`${BASE_URL}/gallery_cat/categories/add`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      fetchCategories();
      setModalVisible(false);
      resetForm();
      setToast(<CToast color="success" visible={true}>
        <CToastBody>
          <CIcon icon={cilInfo} className="me-2" />
          Category added successfully!
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
    } catch (err) {
      console.error('Failed to add category:', err);
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Failed to add category
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await axios.put(
        `${BASE_URL}/gallery_cat/categories/${selectedCategory.id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      fetchCategories();
      setEditModalVisible(false);
      setSelectedCategory(null);
      resetForm();
      setToast(<CToast color="success" visible={true}>
        <CToastBody>
          <CIcon icon={cilInfo} className="me-2" />
          Category updated successfully!
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
    } catch (err) {
      console.error('Failed to update category:', err);
      setToast(<CToast color="danger" visible={true}>
        <CToastBody>
          <CIcon icon={cilWarning} className="me-2" />
          Failed to update category
        </CToastBody>
        <CToastClose onClick={() => setToast(null)} />
      </CToast>);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        setIsLoading(true);
        await axios.delete(`${BASE_URL}/gallery_cat/categories/${id}`);
        fetchCategories();
        setToast(<CToast color="success" visible={true}>
          <CToastBody>
            <CIcon icon={cilInfo} className="me-2" />
            Category deleted successfully!
          </CToastBody>
          <CToastClose onClick={() => setToast(null)} />
        </CToast>);
      } catch (err) {
        console.error('Failed to delete category:', err);
        setToast(<CToast color="danger" visible={true}>
          <CToastBody>
            <CIcon icon={cilWarning} className="me-2" />
            Failed to delete category
          </CToastBody>
          <CToastClose onClick={() => setToast(null)} />
        </CToast>);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      image: null
    });
    setCurrentImage(category.image_url);
    setEditModalVisible(true);
  };

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gallery Categories</h2>
        <div className="d-flex gap-3">
          <CInputGroup style={{ width: '300px' }}>
            <CInputGroupText>
              <CIcon icon={cilSearch} />
            </CInputGroupText>
            <CFormInput
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </CInputGroup>
          <CButton color="danger" onClick={() => setModalVisible(true)}>
            <CIcon icon={cilPlus} className="me-2" />
            Add New Category
          </CButton>
        </div>
      </div>

      <CToaster placement="top-end">
        {toast}
      </CToaster>

      {/* Add Category Modal */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)} backdrop="static">
        <CModalHeader closeButton>
          <CModalTitle>Add New Category</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddCategory}>
            <div className="mb-3">
              <CFormLabel>Category Name</CFormLabel>
              <CFormInput
                type="text"
                name="name"
                placeholder="Enter category name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Category Image</CFormLabel>
              <CFormInput
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="mt-3">
                  <CImage thumbnail src={imagePreview} width={200} />
                </div>
              )}
            </div>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setModalVisible(false)}>
                Cancel
              </CButton>
              <CButton type="submit" color="primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                    Saving...
                  </>
                ) : 'Save Category'}
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      {/* Edit Category Modal */}
      {selectedCategory && (
        <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)} backdrop="static">
          <CModalHeader closeButton>
            <CModalTitle>Edit Category</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={handleEditCategory}>
              <div className="mb-3">
                <CFormLabel>Category Name</CFormLabel>
                <CFormInput
                  type="text"
                  name="name"
                  placeholder="Enter category name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Current Image</CFormLabel>
                {currentImage && (
                  <div className="mb-2">
                    <CImage thumbnail src={`${BASE_URL}${currentImage}`} width={200} />
                  </div>
                )}
                <CFormLabel>Upload New Image</CFormLabel>
                <CFormInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="mt-3">
                    <CImage thumbnail src={imagePreview} width={200} />
                  </div>
                )}
              </div>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setEditModalVisible(false)}>
                  Cancel
                </CButton>
                <CButton type="submit" color="primary" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                      Updating...
                    </>
                  ) : 'Update Category'}
                </CButton>
              </CModalFooter>
            </CForm>
          </CModalBody>
        </CModal>
      )}

      {/* Categories Table */}
      {isLoading && !categories.length ? (
        <div className="text-center py-5">
          <CSpinner color="primary" />
          <p>Loading categories...</p>
        </div>
      ) : (
        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Image</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Created At</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <CTableRow key={category.id}>
                  <CTableDataCell>
                    {category.image_url ? (
                      <CImage thumbnail src={`${BASE_URL}${category.image_url}`} width={100} />
                    ) : (
                      <CBadge color="secondary">
                        <CIcon icon={cilImage} className="me-1" />
                        No Image
                      </CBadge>
                    )}
                  </CTableDataCell>
                  <CTableDataCell>{category.name}</CTableDataCell>
                  <CTableDataCell>
                    {new Date(category.created_at).toLocaleDateString()}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <CButton 
                        color="outline-warning" 
                        size="sm"
                        onClick={() => openEditModal(category)}
                        title="Edit"
                      >
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton 
                        color="outline-danger" 
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                        title="Delete"
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))
            ) : (
              <CTableRow>
                <CTableDataCell colSpan={4} className="text-center py-5">
                  {searchTerm ? 'No matching categories found' : 'No categories available'}
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      )}
    </div>
  );
};

export default GalleryCategoriesPage;