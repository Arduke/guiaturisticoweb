import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api'

interface PoiContextData {
    pois: Array<object>;
}