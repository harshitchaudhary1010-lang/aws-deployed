import express from 'express';
import {
  getCandidates,
  getCandidate,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getConstituencies,
  getParties,
} from '../controllers/candidateController.js';

const router = express.Router();

// Meta routes (should come before :id route)
router.get('/meta/constituencies', getConstituencies);
router.get('/meta/parties', getParties);

// Main CRUD routes
router.route('/')
  .get(getCandidates)
  .post(createCandidate);

router.route('/:id')
  .get(getCandidate)
  .put(updateCandidate)
  .delete(deleteCandidate);

export default router;
