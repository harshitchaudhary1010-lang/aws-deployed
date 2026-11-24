import Announcement from '../models/Announcement.js';

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Public
export const getAnnouncements = async (req, res) => {
  try {
    const { category, limit } = req.query;
    
    let query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    const announcements = await Announcement.find(query)
      .sort({ publishedDate: -1 })
      .limit(limit ? parseInt(limit) : 0);
    
    res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching announcements',
      error: error.message,
    });
  }
};

// @desc    Get single announcement
// @route   GET /api/announcements/:id
// @access  Public
export const getAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    console.error('Error fetching announcement:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching announcement',
      error: error.message,
    });
  }
};

// @desc    Create new announcement
// @route   POST /api/announcements
// @access  Public (should be protected in production)
export const createAnnouncement = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and content',
      });
    }
    
    const announcement = await Announcement.create({
      title,
      content,
      category: category || 'General',
    });
    
    res.status(201).json({
      success: true,
      data: announcement,
      message: 'Announcement created successfully',
    });
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating announcement',
      error: error.message,
    });
  }
};

// @desc    Update announcement
// @route   PUT /api/announcements/:id
// @access  Public (should be protected in production)
export const updateAnnouncement = async (req, res) => {
  try {
    const { title, content, category, isActive } = req.body;
    
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found',
      });
    }
    
    announcement.title = title || announcement.title;
    announcement.content = content || announcement.content;
    announcement.category = category || announcement.category;
    announcement.isActive = isActive !== undefined ? isActive : announcement.isActive;
    
    await announcement.save();
    
    res.status(200).json({
      success: true,
      data: announcement,
      message: 'Announcement updated successfully',
    });
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating announcement',
      error: error.message,
    });
  }
};

// @desc    Delete announcement
// @route   DELETE /api/announcements/:id
// @access  Public (should be protected in production)
export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found',
      });
    }
    
    await announcement.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Announcement deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting announcement',
      error: error.message,
    });
  }
};
