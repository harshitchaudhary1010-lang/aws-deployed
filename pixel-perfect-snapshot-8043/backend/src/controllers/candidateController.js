import Candidate from '../models/Candidate.js';

// @desc    Get all candidates
// @route   GET /api/candidates
// @access  Public
export const getCandidates = async (req, res) => {
  try {
    const { search, constituency, party } = req.query;
    
    let query = {};
    
    // Apply filters
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    if (constituency) {
      query.constituency = constituency;
    }
    
    if (party) {
      query.party = party;
    }
    
    const candidates = await Candidate.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates,
    });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching candidates',
      error: error.message,
    });
  }
};

// @desc    Get single candidate
// @route   GET /api/candidates/:id
// @access  Public
export const getCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: candidate,
    });
  } catch (error) {
    console.error('Error fetching candidate:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching candidate',
      error: error.message,
    });
  }
};

// @desc    Create new candidate
// @route   POST /api/candidates
// @access  Public (should be protected in production)
export const createCandidate = async (req, res) => {
  try {
    const { name, party, constituency, symbol, description, image } = req.body;
    
    // Validate required fields
    if (!name || !party || !constituency || !symbol || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }
    
    const candidate = await Candidate.create({
      name,
      party,
      constituency,
      symbol,
      description,
      image: image || '',
    });
    
    res.status(201).json({
      success: true,
      data: candidate,
      message: 'Candidate created successfully',
    });
  } catch (error) {
    console.error('Error creating candidate:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating candidate',
      error: error.message,
    });
  }
};

// @desc    Update candidate
// @route   PUT /api/candidates/:id
// @access  Public (should be protected in production)
export const updateCandidate = async (req, res) => {
  try {
    const { name, party, constituency, symbol, description, image } = req.body;
    
    const candidate = await Candidate.findById(req.params.id);
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found',
      });
    }
    
    // Update fields
    candidate.name = name || candidate.name;
    candidate.party = party || candidate.party;
    candidate.constituency = constituency || candidate.constituency;
    candidate.symbol = symbol || candidate.symbol;
    candidate.description = description || candidate.description;
    candidate.image = image !== undefined ? image : candidate.image;
    
    await candidate.save();
    
    res.status(200).json({
      success: true,
      data: candidate,
      message: 'Candidate updated successfully',
    });
  } catch (error) {
    console.error('Error updating candidate:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating candidate',
      error: error.message,
    });
  }
};

// @desc    Delete candidate
// @route   DELETE /api/candidates/:id
// @access  Public (should be protected in production)
export const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found',
      });
    }
    
    await candidate.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Candidate deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting candidate:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting candidate',
      error: error.message,
    });
  }
};

// @desc    Get unique constituencies
// @route   GET /api/candidates/meta/constituencies
// @access  Public
export const getConstituencies = async (req, res) => {
  try {
    const constituencies = await Candidate.distinct('constituency');
    
    res.status(200).json({
      success: true,
      data: constituencies.sort(),
    });
  } catch (error) {
    console.error('Error fetching constituencies:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching constituencies',
      error: error.message,
    });
  }
};

// @desc    Get unique parties
// @route   GET /api/candidates/meta/parties
// @access  Public
export const getParties = async (req, res) => {
  try {
    const parties = await Candidate.distinct('party');
    
    res.status(200).json({
      success: true,
      data: parties.sort(),
    });
  } catch (error) {
    console.error('Error fetching parties:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching parties',
      error: error.message,
    });
  }
};
