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
  CFormSelect,
  CAlert,
  CImage,
  CTooltip,
  CCard,
  CCardBody,
  CCardHeader,
  CInputGroup,
  CInputGroupText,
  CToaster,
  CToast,
  CToastBody,
  CToastClose
} from '@coreui/react-pro';
import CIcon from '@coreui/icons-react';
import {
  cilPlus,
  cilPencil,
  cilTrash,
  cilSave,
  cilX,
  cilImage as cilImageIcon,
  cilSearch,
  cilFilter,
  cilFolder,
  cilInfo,
  cilWarning,
  cilCheckCircle
} from '@coreui/icons';

const ImagesPage = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    categoryName: '',
    description: '',
  });

  // Fetch images and categories
  const fetchImages = async () => {
    try {
      const response = await axios.get('http://64.227.163.17:8000/images/images/');
      setImages(response.data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch images:', err);
      setError('Failed to fetch images. Please try again later.');
      setToast(
        <CToast color="danger" visible={true}>
          <CToastBody>
            <CIcon icon={cilWarning} className="me-2" />
            Failed to fetch images. Please try again later.
          </CToastBody>
          <CToastClose onClick={() => setToast(null)} />
        </CToast>
      );
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://64.227.163.17:8000/gallery_cat/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError('Failed to fetch categories. Please try again later.');
      setToast(
        <CToast color="danger" visible={true}>
          <CToastBody>
            <CIcon icon={cilWarning} className="me-2" />
            Failed to fetch categories. Please try again later.
          </CToastBody>
          <CToastClose onClick={() => setToast(null)} />
        </CToast>
      );
    }
  };

  useEffect(() => {
    fetchImages();
    fetchCategories();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      image: null,
      categoryName: '',
      description: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleAddImage = async (e) => {
    e.preventDefault();

    const selectedCategory = categories.find((cat) => cat.name === formData.categoryName);
    if (!selectedCategory) {
      setError('Please select a valid category.');
      setToast(
        <CToast color="danger" visible={true}>
          <CToastBody>
            <CIcon icon={cilWarning} className="me-2" />
            Please select a valid category.
          </CToastBody>
          <CToastClose onClick={() => setToast(null)} />
        </CToast>
      );
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('file', formData.image);
    if (formData.description) {
      formDataToSend.append('description', formData.description);
    }

    try {
      await axios.post(
        `http://64.227.163.17:8000/images/images/add?name=${formData.name}&category_id=${selectedCategory.id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      fetchImages();
      setModalVisible(false);
      resetForm();
      setToast(
        <CToast color="success" visible={true}>
          <CToastBody>
            <CIcon icon={cilCheckCircle} className="me-2" />
            Image added successfully!
          </CToastBody>
          <CToastClose onClick={() => setToast(null)} />
        </CToast>
      );
    } catch (err) {
      console.error('Failed to add image:', err);
      setToast(
        <CToast color="danger" visible={true}>
          <CToastBody>
            <CIcon icon={cilWarning} className="me-2" />
            Failed to add image. Please try again.
          </CToastBody>
          <CToastClose onClick={() => setToast(null)} />
        </CToast>
      );
    }
  };

  const handleEditImage = async (e) => {
    e.preventDefault();

    const selectedCategory = categories.find((cat) => cat.name === formData.categoryName);
    if (!selectedCategory) {
      setError('Please select a valid category.');
      setToast(
        <CToast color="danger" visible={true}>
          <CToastBody>
            <CIcon icon={cilWarning} className="me-2" />
            Please select a valid category.
          </CToastBody>
          <CToastClose onClick={() => setToast(null)} />
        </CToast>
      );
      return;
    }

    const formDataToSend = new FormData();
    if (formData.image instanceof File) {
      formDataToSend.append('file', formData.image);
    }
    if (formData.description) {
      formDataToSend.append('description', formData.description);
    }

    try {
      await axios.put(
        `http://64.227.163.17:8000/images/images/${selectedImage.id}?name=${formData.name}&category_id=${selectedCategory.id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      fetchImages();
      setEditModalVisible(false);
      setSelectedImage(null);
      resetForm();
      setToast(
        <CToast color="success" visible={true}>
          <CToastBody>
            <CIcon icon={cilCheckCircle} className="me-2" />
            Image updated successfully!
          </CToastBody>
          <CToastClose onClick={() => setToast(null)} />
        </CToast>
      );
    } catch (err) {
      console.error('Failed to update image:', err);
      setToast(
        <CToast color="danger" visible={true}>
          <CToastBody>
            <CIcon icon={cilWarning} className="me-2" />
            Failed to update image. Please try again.
          </CToastBody>
          <CToastClose onClick={() => setToast(null)} />
        </CToast>
      );
    }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    try {
      await axios.delete(`http://64.227.163.17:8000/images/images/${id}`);
      fetchImages();
      setToast(
        <CToast color="success" visible={true}>
          <CToastBody>
            <CIcon icon={cilCheckCircle} className="me-2" />
            Image deleted successfully!
          </CToastBody>
          <CToastClose onClick={() => setToast(null)} />
        </CToast>
      );
    } catch (err) {
      console.error('Failed to delete image:', err);
      setToast(
        <CToast color="danger" visible={true}>
          <CToastBody>
            <CIcon icon={cilWarning} className="me-2" />
            Failed to delete image. Please try again.
          </CToastBody>
          <CToastClose onClick={() => setToast(null)} />
        </CToast>
      );
    }
  };

  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (image.description && image.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  return (
    <div className="images-management-container">
      <CCard>
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">
              <CIcon icon={cilImageIcon} className="me-2 text-primary" />
              Images Management
            </h2>
            <CButton 
              color="primary" 
              onClick={() => setModalVisible(true)}
              shape="rounded-pill"
            >
              <CIcon icon={cilPlus} className="me-2" />
              Add Image
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <CToaster placement="top-end">
            {toast}
          </CToaster>

          <div className="mb-4">
            <CInputGroup>
              <CInputGroupText>
                <CIcon icon={cilSearch} />
              </CInputGroupText>
              <CFormInput
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </CInputGroup>
          </div>

          <div className="table-responsive">
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>
                    <CIcon icon={cilFolder} className="me-1" />
                    Category
                  </CTableHeaderCell>
                  <CTableHeaderCell>
                    <CIcon icon={cilImageIcon} className="me-1" />
                    Preview
                  </CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredImages.map((image) => (
                  <CTableRow key={image.id}>
                    <CTableDataCell>
                      <strong>{image.name}</strong>
                      {image.description && (
                        <div className="small text-muted">
                          {image.description.length > 50 
                            ? `${image.description.substring(0, 50)}...` 
                            : image.description}
                        </div>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {categories.find((cat) => String(cat.id) === String(image.category_id))?.name || 'Uncategorized'}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CImage
                        src={`http://64.227.163.17:8000/${image.file_path}`}
                        alt={image.name}
                        thumbnail
                        width={80}
                        height={60}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex">
                        <CTooltip content="Edit">
                          <CButton
                            color="warning"
                            variant="ghost"
                            shape="rounded-pill"
                            size="sm"
                            onClick={() => {
                              setSelectedImage(image);
                              setFormData({
                                name: image.name,
                                image: null,
                                categoryName: categories.find((cat) => String(cat.id) === String(image.category_id))?.name || '',
                                description: image.description || '',
                              });
                              setEditModalVisible(true);
                            }}
                            className="me-2"
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Delete">
                          <CButton
                            color="danger"
                            variant="ghost"
                            shape="rounded-pill"
                            size="sm"
                            onClick={() => handleDeleteImage(image.id)}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CTooltip>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>
        </CCardBody>
      </CCard>

      {/* Add Image Modal */}
      <CModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        size="lg"
        backdrop="static"
      >
        <CModalHeader closeButton>
          <CModalTitle>
            <CIcon icon={cilPlus} className="me-2" />
            Add New Image
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddImage}>
            <div className="mb-3">
              <CFormInput
                type="text"
                name="name"
                placeholder="Enter image name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
              {formData.image instanceof File && (
                <div className="mt-2">
                  <CImage
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    thumbnail
                    width={150}
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <CFormSelect
                name="categoryName"
                value={formData.categoryName}
                onChange={handleInputChange}
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormInput
                type="text"
                name="description"
                placeholder="Enter description (optional)"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <CModalFooter>
              <CButton 
                color="secondary" 
                onClick={() => setModalVisible(false)}
                variant="outline"
              >
                <CIcon icon={cilX} className="me-1" />
                Cancel
              </CButton>
              <CButton type="submit" color="primary">
                <CIcon icon={cilSave} className="me-1" />
                Add Image
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      {/* Edit Image Modal */}
      {selectedImage && (
        <CModal 
          visible={editModalVisible} 
          onClose={() => setEditModalVisible(false)}
          size="lg"
          backdrop="static"
        >
          <CModalHeader closeButton>
            <CModalTitle>
              <CIcon icon={cilPencil} className="me-2" />
              Edit Image
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={handleEditImage}>
              <div className="mb-3">
                <CFormInput
                  type="text"
                  name="name"
                  placeholder="Enter image name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {formData.image instanceof File ? (
                  <div className="mt-2">
                    <CImage
                      src={URL.createObjectURL(formData.image)}
                      alt="New Preview"
                      thumbnail
                      width={150}
                    />
                    <small className="text-muted">New image selected</small>
                  </div>
                ) : (
                  <div className="mt-2">
                    <CImage
                      src={`http://64.227.163.17:8000/${selectedImage.file_path}`}
                      alt="Current"
                      thumbnail
                      width={150}
                    />
                    <small className="text-muted">Current image</small>
                  </div>
                )}
              </div>
              <div className="mb-3">
                <CFormSelect
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormInput
                  type="text"
                  name="description"
                  placeholder="Enter description (optional)"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <CModalFooter>
                <CButton 
                  color="secondary" 
                  onClick={() => setEditModalVisible(false)}
                  variant="outline"
                >
                  <CIcon icon={cilX} className="me-1" />
                  Cancel
                </CButton>
                <CButton type="submit" color="primary">
                  <CIcon icon={cilSave} className="me-1" />
                  Update
                </CButton>
              </CModalFooter>
            </CForm>
          </CModalBody>
        </CModal>
      )}
    </div>
  );
};

export default ImagesPage;